import { UserForgotPasswordForm } from "../../../components/custom/form/auth/auth-forgot-form";

export default function ForgotPassword() {
	return (
		<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]  border border-gray-200 rounded-md p-10 shadow-lg'>
			<div className='flex flex-col space-y-2 text-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>
					Mot de passe oublié
				</h1>
				<p className='text-sm text-muted-foreground'>
					Entrez l'email utilisé pour votre compte
				</p>
			</div>
			<UserForgotPasswordForm />
			<p className='px-8 text-center text-sm text-muted-foreground'>
				<span>Vous souvenez-vous du mot de passe?</span>{" "}
				<a
					href='/login'
					className='text-main-color hover:underline-offset-4 hover:underline'
				>
					Connectez-vous
				</a>
			</p>
		</div>
	);
}
