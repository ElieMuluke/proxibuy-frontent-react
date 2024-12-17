"use client";
import { UserVerifyOTPForm } from "../../../components/custom/form/auth/auth-verify-form";
import { useSearchParams } from "react-router-dom";

export default function VerifyOTP() {
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email") ?? "";

	return (
		<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border border-gray-200 rounded-md p-10 shadow-lg'>
			<div className='flex flex-col space-y-2 text-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>Vérifier OTP</h1>
				<p className='text-sm text-muted-foreground'>
					Entre le code OTP reçu par email pour réinitialiser le mot de passe de
					votre compte
				</p>
			</div>
			<UserVerifyOTPForm email={email} />
		</div>
	);
}
