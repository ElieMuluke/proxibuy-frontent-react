"use client";
import { UserActivateForm } from "../../../components/custom/form/auth/auth-activate-user-form";
import { useSearchParams } from "react-router-dom";

export default function ActivateUser() {
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email") ?? "";
	return (
		<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border border-gray-200 rounded-md p-10 shadow-lg'>
			<div className='flex flex-col space-y-2 text-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>
					Activez votre comptre
				</h1>
				<p className='text-sm text-muted-foreground'>
					Entrez le code que vous avec reçu par email pour activer votre compte
				</p>
			</div>
			<UserActivateForm email={email} />
		</div>
	);
}
