import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "../../../../lib/utils";
import { userActivateAccountSchema } from "../../../../lib/validations/auth";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useToast } from "../../../../components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { activateAccount } from "../../../../services/auth";
import { useNavigate } from "react-router-dom";

interface UserActivateFormProps extends React.HTMLAttributes<HTMLDivElement> {
	email: string;
}

type FormData = z.infer<typeof userActivateAccountSchema>;

export function UserActivateForm({
	className,
	email,
	...props
}: UserActivateFormProps) {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(userActivateAccountSchema),
	});

	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(data: FormData) {
		setIsLoading(true);

		try {
			const activateAccountResult = await activateAccount(data.otp, email);
			const message = activateAccountResult.message[0];
			const statusCode = activateAccountResult.statusCode;

			if (statusCode !== 200) {
				return toast({
					description: message,
					variant: "destructive",
				});
			} else {
				toast({
					description: message,
				});

				setTimeout(() => navigate("/login"), 1500);
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
						<Label className='sr-only' htmlFor='otp'>
							OTP
						</Label>
						<Input
							id='otp'
							placeholder='e.g. 123445'
							type='text'
							autoCapitalize='none'
							autoComplete='otp'
							autoCorrect='off'
							disabled={isLoading}
							className='rounded-full'
							{...register("otp")}
						/>
						{errors?.otp && (
							<p className='px-1 text-xs text-red-600'>{errors.otp.message}</p>
						)}
					</div>

					<button
						className='border flex items-center justify-center transition-all hover:transition-all bg-main-color py-2 my-2 text-white rounded-full text-sm hover:text-main-color hover:bg-white hover:border-main-color '
						disabled={isLoading}
					>
						{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						Activer compte
					</button>
				</div>
			</form>
		</div>
	);
}
