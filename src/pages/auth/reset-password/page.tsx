"use client";
import { UserResetForm } from "../../../components/custom/form/auth/auth-reset-form";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email") ?? "";
	const code = searchParams.get("code") ?? "";
	return (
		<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border border-gray-200 rounded-md p-10 shadow-lg'>
			<div className='flex flex-col space-y-2 text-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>
					Reinitialiser le mot de passe
				</h1>
				<p className='text-sm text-muted-foreground'>
					Entrer le nouveau mot de passe pour votre compte
				</p>
			</div>
			<UserResetForm email={email} code={code} />
		</div>
	);
}
