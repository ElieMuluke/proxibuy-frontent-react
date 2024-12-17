import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { addProductFormSchema } from "../../../../lib/validations/boutique";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Loader2, Check } from "lucide-react";
import { getUserSession } from "../../../../lib/cookies";
import { cn } from "../../../../lib/utils";
import { uploadProductImage } from "../../../../services/misc";
import { addProductSchema, addProduct } from "../../../../services/products";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { useToast } from "../../../ui/use-toast";
import { Button } from "../../../ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

interface AddProductFormProps extends React.HTMLAttributes<HTMLDivElement> {
	boutiqueId: string | undefined;
	storeCategories?: {
		id: string;
		categoryId: string;
		name: string;
	}[];
}
type FormData = z.infer<typeof addProductFormSchema>;

export default function AddProductForm({
	className,
	boutiqueId = "0",
	storeCategories,
	...props
}: AddProductFormProps) {
	const router = useRouter();

	const form = useForm<FormData>({
		resolver: zodResolver(addProductFormSchema),
		defaultValues: {
			productMainImage: null, // Default is null for File instance
			images: [], // Default is an empty array for image uploads
			productName: "", // Empty string for a required text field
			productDescription: "", // Empty string for a required text field
			productStock: 0, // Default stock value is 0
			lastPrice: 0, // Default last price is 0
			forSale: true, // Default boolean for sale status is false
			isAvailable: true, // Default availability status is false
			categoryProductId: "", // Empty string for required category
		},
	});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const addProductMutation = useMutation({
		mutationFn: (data: addProductSchema) => addProduct(data),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["storeProducts"] });
			toast({
				variant: "default",
				description: "Le produit a été ajouté",
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				description: "Le produit n'a pas pu être ajouté",
			});
		},
	});

	async function onSubmit(data: FormData) {
		setIsLoading(true);

		try {
			// console.log("form submit", data);
			// Step 1: Validate that the main image and at least one additional image exist
			if (
				!data.productMainImage ||
				!(data.productMainImage instanceof File) ||
				data.productMainImage.size === 0
			) {
				toast({
					variant: "destructive",
					description: "L'image principale du produit est obligatoire.",
				});
				setIsLoading(false);
				return;
			}

			if (
				!data.images ||
				!Array.isArray(data.images) ||
				data.images.length === 0 ||
				data.images.some(
					(image) => !(image instanceof File) || image.size === 0
				)
			) {
				toast({
					variant: "destructive",
					description:
						"Vous devez ajouter au moins une image supplémentaire valide.",
				});
				setIsLoading(false);
				return;
			}

			// Step 2: Upload images and collect filenames
			const uploadedImages = {
				mainImage: "",
				additionalImages: [] as string[],
			};

			// Upload main image
			const mainImageUpload = await uploadProductImage({
				image: data.productMainImage,
			});

			// Check if main image upload was successful
			if (mainImageUpload.statusCode !== 201) {
				toast({
					variant: "destructive",
					description: mainImageUpload.message[0],
				});
				setIsLoading(false);
				return;
			} else {
				uploadedImages.mainImage = `https://api-proxibuy.online/api/files/download/${mainImageUpload.data?.item?.filename}`;
			}

			// Upload additional images
			const uploadedImageFiles = [];

			for (const image of data.images) {
				const imageUpload = await uploadProductImage({ image });

				if (imageUpload.statusCode !== 201) {
					toast({
						variant: "destructive",
						description: `Échec du téléchargement d'une image: ${imageUpload.message[0]}`,
					});
					setIsLoading(false);
					return;
				} else {
					uploadedImageFiles.push(
						`https://api-proxibuy.online/api/files/download/${imageUpload.data?.item?.filename}`
					);
				}
			}

			uploadedImages.additionalImages = uploadedImageFiles;

			// Step 3: Submit the rest of the product data along with uploaded image URLs
			const session = JSON.parse((await getUserSession()) || "{}");

			// Example of sending the data to your API
			addProductMutation.mutate({
				storeId: boutiqueId,
				name: data.productName,
				mainImage: uploadedImages.mainImage,
				images: JSON.stringify({ data: uploadedImages.additionalImages }), // Array of uploaded image URLs
				description: data.productDescription,
				isAvailable: data.isAvailable,
				forSale: data.forSale, // Added for sale field
				price: Number(data.lastPrice),
				lastPrice: Number(data.lastPrice),
				currentStock: Number(data.productStock),
				categoryProductId: data.categoryProductId, // Ensure this matches the schema
				status: "ACTIVE",
				ownerId: session.id,
			});

			// Success toast
			toast({
				variant: "default",
				description: "Produit ajouté avec succès!",
			});

			// Optionally, navigate or reset the form
			// form.reset();
			// router.push(returnToScreen);
		} catch {
			toast({
				variant: "destructive",
				description: "An unexpected error occurred.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-2'>
						{/* Product Main Image */}
						<FormField
							control={form.control}
							name='productMainImage'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image principale du produit</FormLabel>
									<FormControl>
										<Input
											type='file'
											accept='image/*'
											onChange={(e) => field.onChange(e.target.files?.[0])} // Single file handling
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Product Images */}
						<FormField
							control={form.control}
							name='images'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Images supplémentaires du produit</FormLabel>
									<FormControl>
										<Input
											type='file'
											accept='image/*'
											multiple
											onChange={(e) => {
												const files = e.target.files
													? Array.from(e.target.files)
													: [];
												field.onChange(files); // Ensure non-null before using Array.from
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Product Name */}
						<FormField
							control={form.control}
							name='productName'
							// defaultValue={userData?.fName || ""}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Le Nom du produit</FormLabel>
									<FormControl>
										<Input placeholder='Le Nom du produit' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Product Description */}
						<FormField
							control={form.control}
							name='productDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder='Description du produit' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex justify-between'>
							{/* product stock */}
							<FormField
								control={form.control}
								name='productStock'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Stock Produit</FormLabel>
										<FormControl>
											<Input
												placeholder='Stock Produit'
												type='number'
												inputMode='numeric'
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))} // Ensure it returns a number
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Last Price */}
							<FormField
								control={form.control}
								name='lastPrice'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dernier prix</FormLabel>
										<FormControl>
											<Input
												placeholder='Dernier prix'
												type='number'
												inputMode='numeric'
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))} // Ensure it returns a number
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='flex justify-between'>
							{/* For Sale */}
							<FormField
								control={form.control}
								name='forSale'
								render={({ field }) => (
									<FormItem className='space-y-3'>
										<FormLabel>Produit à vendre</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={(value) =>
													field.onChange(value === "yes")
												} // Convert "yes" to true, "no" to false
												value={field.value ? "yes" : "no"} // Set the value based on boolean field
												className='flex flex-col space-y-1'
											>
												<FormItem className='flex items-center space-x-3'>
													<FormControl>
														<RadioGroupItem value='yes' />
													</FormControl>
													<FormLabel className='font-normal'>Oui</FormLabel>
												</FormItem>

												<FormItem className='flex items-center space-x-3'>
													<FormControl>
														<RadioGroupItem value='no' />
													</FormControl>
													<FormLabel className='font-normal'>Non</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Is Available */}
							<FormField
								control={form.control}
								name='isAvailable'
								render={({ field }) => (
									<FormItem className='space-y-3'>
										<FormLabel>Produit disponible</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={(value) =>
													field.onChange(value === "yes")
												} // Convert "yes" to true, "no" to false
												value={field.value ? "yes" : "no"} // Set the value based on boolean field
												className='flex flex-col space-y-1'
											>
												<FormItem className='flex items-center space-x-3'>
													<FormControl>
														<RadioGroupItem value='yes' />
													</FormControl>
													<FormLabel className='font-normal'>Oui</FormLabel>
												</FormItem>

												<FormItem className='flex items-center space-x-3'>
													<FormControl>
														<RadioGroupItem value='no' />
													</FormControl>
													<FormLabel className='font-normal'>Non</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Product Category (Dropdown) */}
						<FormField
							control={form.control}
							name='categoryProductId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Catégorie</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder='Choisir une catégorie' />
										</SelectTrigger>
										<SelectContent>
											{storeCategories?.map((categoryItem) => (
												<SelectItem
													key={categoryItem.id}
													value={categoryItem.categoryId}
												>
													{categoryItem.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Submit Button */}
						<div className='flex justify-between'>
							<Button type='submit' disabled={isLoading}>
								{isLoading ? (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								) : (
									<Check />
								)}
								Ajouter
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
