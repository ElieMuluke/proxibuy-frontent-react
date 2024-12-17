import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userRegisterSchema } from "../../../../lib/validations/auth";
import { useToast } from "../../../ui/use-toast";
import { signup } from "../../../../services/auth";
import { Loader2 } from "lucide-react";
import { Input } from "../../../ui/input";
import { cn } from "../../../../lib/utils";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof userRegisterSchema>;

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userRegisterSchema),
	});

	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(data: FormData) {
		setIsLoading(true);

		try {
			const signUpResult = await signup(
				data.firstName,
				data.lastName,
				data.email,
				data.password
			);
			const message = signUpResult.message[0];
			const statusCode = signUpResult.statusCode;

			setIsLoading(false);

			if (statusCode !== 200) {
				toast({
					description: message,
					variant: "destructive",
				});
			} else {
				toast({
					description: message,
				});

				setTimeout(() => {
					window.location.href = `/activate-account?email=${data.email}`;
				}, 1500);
			}
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
				<div className='grid gap-2'>
					<div className='flex gap-1 w-full'>
						<div>
							<label className='sr-only' htmlFor='firstName'>
								Prénom
							</label>
							<Input
								id='firstName'
								placeholder='Votre prenom'
								type='text'
								autoCapitalize='none'
								autoComplete='firstName'
								autoCorrect='off'
								disabled={isLoading}
								className='rounded-full'
								{...register("firstName")}
							/>
							{errors?.firstName && (
								<p className='px-1 text-xs text-red-600'>
									{errors.firstName.message}
								</p>
							)}
						</div>
						<div className='grid gap-1'>
							<label className='sr-only' htmlFor='lastName'>
								Post-nom
							</label>
							<Input
								id='lastName'
								placeholder='Votre post-nom'
								type='text'
								autoCapitalize='none'
								autoComplete='lastName'
								autoCorrect='off'
								disabled={isLoading}
								className='rounded-full'
								{...register("lastName")}
							/>
							{errors?.lastName && (
								<p className='px-1 text-xs text-red-600'>
									{errors.lastName.message}
								</p>
							)}
						</div>
					</div>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='email'>
							Email
						</label>
						<Input
							id='email'
							placeholder='eg. name@example.com'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
							className='rounded-full'
							{...register("email")}
						/>
						{errors?.email && (
							<p className='px-1 text-xs text-red-600'>
								{errors.email.message}
							</p>
						)}
					</div>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='password'>
							Mot de passe
						</label>
						<Input
							id='password'
							placeholder='eg. tonMotDePasse@123'
							type='password'
							autoCapitalize='none'
							autoComplete='password'
							autoCorrect='off'
							disabled={isLoading}
							className='rounded-full'
							{...register("password")}
						/>
						{errors?.password && (
							<p className='px-1 text-xs text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						className='border flex items-center justify-center transition-all hover:transition-all bg-main-color py-2 my-2 text-white rounded-full text-sm hover:text-main-color hover:bg-white hover:border-main-color '
						disabled={isLoading}
					>
						{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						S'inscrire avec mon email
					</button>
				</div>
			</form>
		</div>
	);
}
