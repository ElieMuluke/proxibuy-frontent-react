import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "../../../../lib/utils";
import { userForgotSchema } from "../../../../lib/validations/auth";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useToast } from "../../../ui/use-toast";
import { Loader2 } from "lucide-react";
import { forgotPassword } from "../../../../services/auth";
import { useNavigate } from "react-router-dom";

type UserForgotPasswordFormProps = React.HTMLAttributes<HTMLDivElement>;
type FormData = z.infer<typeof userForgotSchema>;

export function UserForgotPasswordForm({
	className,
	...props
}: UserForgotPasswordFormProps) {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userForgotSchema),
	});

	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(data: FormData) {
		setIsLoading(true);

		try {
			const forgotResult = await forgotPassword(data.email);
			const message = forgotResult.message[0];
			const statusCode = forgotResult.statusCode;

			if (statusCode !== 200) {
				return toast({
					description: message,
					variant: "destructive",
				});
			} else {
				toast({
					description: message,
				});

				setTimeout(() => navigate(`/verify-otp?email=${data.email}`), 1500);
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
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='email'
							placeholder='eg.name@example.com'
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

					<button
						className='border flex items-center justify-center transition-all hover:transition-all bg-main-color py-2 my-2 text-white rounded-full text-sm hover:text-main-color hover:bg-white hover:border-main-color '
						disabled={isLoading}
					>
						{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						Oublier mon mot de passe
					</button>
				</div>
			</form>
		</div>
	);
}
