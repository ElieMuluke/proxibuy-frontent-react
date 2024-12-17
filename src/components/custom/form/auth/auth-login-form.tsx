import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useToast } from "../../../ui/use-toast";
import { cn } from "../../../../lib/utils";
import { userLoginSchema } from "../../../../lib/validations/auth";
import { signIn } from "../../../../services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
	returnTo?: string;
}

type FormData = z.infer<typeof userLoginSchema>;

export function UserLoginForm({
	className,
	returnTo,
	...props
}: UserLoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userLoginSchema),
	});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();

	async function onSubmit(data: FormData) {
		setIsLoading(true);
		try {
			const signInResult = await signIn(data.email, data.password);
			const message = signInResult.message[0];
			const statusCode = signInResult.statusCode;

			if (statusCode !== 200) {
				toast({
					variant: "destructive",
					description: message,
				});
				return;
			}

			const isUserActive = signInResult?.data?.item?.user?.isActive;

			if (isUserActive) {
				toast({
					variant: "default",
					description: message,
				});
			} else {
				toast({
					variant: "destructive",
					description:
						"Votre compte est désactivé. Veuillez contacter l'administrateur du système !",
				});
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
					{/* Email input */}
					<div className='grid gap-1 my-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							className='rounded-full h-[28px]'
							id='email'
							placeholder='name@example.com'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
							{...register("email")}
						/>
						{errors?.email && (
							<p className='px-1 text-xs text-red-600'>
								{errors.email.message}
							</p>
						)}
					</div>
					{/* Password input */}
					<div className='grid gap-1 my-1'>
						<Label className='sr-only' htmlFor='password'>
							Mot de passe
						</Label>
						<Input
							className='rounded-full h-[28px]'
							id='password'
							placeholder='eg. tonMotDePasse@123'
							type='password'
							autoCapitalize='none'
							autoComplete='password'
							autoCorrect='off'
							disabled={isLoading}
							{...register("password")}
						/>
						{errors?.password && (
							<p className='px-1 text-xs text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>
					{/* Other elements */}
					<div className='flex justify-end'>
						<a
							href='/forgot-password'
							className='text-xs text-main-color underline cursor-pointer underline-offset-4'
						>
							Mot de passe oublié ?
						</a>
					</div>
					<button
						className='border flex items-center justify-center transition-all hover:transition-all bg-main-color py-2 text-white rounded-full text-sm hover:text-main-color hover:bg-white hover:border-main-color'
						disabled={isLoading}
					>
						{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						Se connecter
					</button>
				</div>
			</form>
		</div>
	);
}
