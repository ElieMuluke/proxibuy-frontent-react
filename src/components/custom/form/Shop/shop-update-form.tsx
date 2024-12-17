import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "../../../../lib/utils";
import { Check, Loader2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { useToast } from "../../../ui/use-toast";
import { Textarea } from "../../../ui/textarea";
import { updateBoutiqueFormSchema } from "../../../../lib/validations/boutique";

interface UpdateBoutiqueFormProps extends React.HTMLAttributes<HTMLDivElement> {
	boutiqueId?: string | undefined;
}
type FormData = z.infer<typeof updateBoutiqueFormSchema>;

export function UpdateBoutiqueForm({
	className,
	boutiqueId,
	...props
}: UpdateBoutiqueFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(updateBoutiqueFormSchema),
	});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();

	async function onSubmit(data: FormData) {
		setIsLoading(true);

		try {
			console.log("data", data);
			console.log("boutiqueId", boutiqueId);
			// const updateStoreResult = await signIn(data.email, data.password);
			// console.log("signInResult", updateStoreResult);
			// const message = updateStoreResult.message[0];
			// const statusCode = updateStoreResult.statusCode;

			// setIsLoading(false);

			// if (statusCode !== 200) {
			// 	toast({
			// 		variant: "destructive",
			// 		description: message,
			// 	});
			// } else {
			// 	toast({
			// 		variant: "default",
			// 		description: message,
			// 	});

			// 	setTimeout(() => {
			// 		window.location.href = returnToScreen;
			// 	}, 1500);
			// }
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-2'>
					<div className='grid gap-1'>
						<Input
							id='boutiqueName'
							placeholder='Nom de la boutique'
							type='text'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isLoading}
							{...register("boutiqueName")}
						/>
						{errors?.boutiqueName && (
							<p className='px-1 text-xs text-red-600'>
								{errors.boutiqueName.message}
							</p>
						)}
					</div>
					<div className='grid gap-1'>
						<Input
							id='boutiqueAddress'
							placeholder='Addresse de la boutique'
							type='text'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isLoading}
							{...register("boutiqueAddress")}
						/>
						{errors?.boutiqueAddress && (
							<p className='px-1 text-xs text-red-600'>
								{errors.boutiqueAddress.message}
							</p>
						)}
					</div>
					<div className='grid gap-1'>
						<Textarea
							id='boutiqueDescription'
							placeholder='Description de la boutique'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isLoading}
							{...register("boutiqueDescription")}
						/>
						{errors?.boutiqueDescription && (
							<p className='px-1 text-xs text-red-600'>
								{errors.boutiqueDescription.message}
							</p>
						)}
					</div>
					<div className='flex justify-between'>
						<Button
							className='gap-2 hover:bg-[#F6208F] transition ease-in-out duration-300'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<Check />
							)}
							<span>Modifier</span>
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
