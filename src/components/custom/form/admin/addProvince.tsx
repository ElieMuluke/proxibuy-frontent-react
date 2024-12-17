"use client";
import { Button } from "@components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { Loader, Loader2 } from "lucide-react";
import { Input } from "@components/ui/input";
import { addAdminUser } from "@services/user";
import { addProvince, getCountries } from "@services/address";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "The nom must be at least 2 characters.",
	}),
	countryId: z.string(),
});

interface Country {
	id: string;
	name: string;
	codePhoneNumber: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

interface CountryData {
	data: {
		items: Country[];
	};
}

interface AddProvinceFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddProvinceForm({ ...props }: AddProvinceFormProps) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			countryId: "",
		},
	});

	const {
		isLoading: countriesLoading,
		isError: countriesHasError,
		error: countriesError,
		data: countries,
	} = useQuery<CountryData>({
		queryKey: ["countries"],
		queryFn: () => getCountries(),
		// enabled: keyword.length > 0 ? true : false,
	});

	const mutation = useMutation({
		mutationFn: addProvince,
		onSuccess: () => {
			toast({ variant: "default", title: "province was created" });
			queryClient.invalidateQueries({ queryKey: ["countries"] });
		},
		onError: (error: any) => {
			toast({
				variant: "destructive",
				title: "Error adding the province",
				description: error.message,
			});
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log("values", values);
		// console.log("user object value", {
		// 	...values,
		// 	typeUser: "ADMIN",
		// 	password: "1234567890",
		// });
		mutation.mutate({
			name: values.name,
			countryId: values.countryId,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='grid grid-cols-1 gap-4'>
					<div className='grid grid-cols-1 gap-4'>
						<FormField
							control={form.control}
							name='countryId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pays de la province</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Selectionne le pays de la province ' />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{countriesLoading && (
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											)}
											{countriesHasError && <div>{countriesError.message}</div>}
											{!countriesHasError && countries && (
												<>
													{countries.data.items
														// .filter((user: any) => user.role === "ADMIN")
														.map((country: any) => (
															<SelectItem key={country.id} value={country.id}>
																{country.name}
															</SelectItem>
														))}
												</>
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom de la province:</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='Nom de la province'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<Button
							type='submit'
							disabled={mutation.isPending}
							className='w-full'
						>
							{mutation.isPending && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							Ajouter Province
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
