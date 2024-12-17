import { UserRegisterForm } from "../../../components/custom/form/auth/auth-register-form";

export default function RegisterPage() {
	return (
		<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]  border border-gray-200 rounded-md p-10 shadow-lg'>
			<div className='flex flex-col space-y-2 text-center'>
				{/* <Icons.logo className='mx-auto h-6 w-6' /> */}
				<h1 className='text-2xl font-semibold tracking-tight'>
					Enregistrez un nouveau compte
				</h1>
				<p className='text-sm text-muted-foreground'>
					Remplissez le formulaire pour créer un compte
				</p>
			</div>
			<UserRegisterForm />
			<p className='px-8 text-center text-sm text-muted-foreground'>
				<a href='/login'>
					Vous avez déjà un compte?{" "}
					<span className='text-main-color hover:underline-offset-4 hover:underline'>
						Connectez-vous
					</span>
				</a>
			</p>
		</div>
	);
}
