import { UserLoginForm } from "../../..//components/custom/form/auth/auth-login-form";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
	const [searchParams] = useSearchParams();

	const returnTo = searchParams.get("returnTo") ?? "/";
	return (
		<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border border-gray-200 rounded-md p-8 shadow-lg'>
			<div className='flex flex-col space-y-2 text-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>Connexion</h1>
				<p className='text-sm text-muted-foreground'>
					Entre ton email pour te connecter à ton compte
				</p>
			</div>

			<UserLoginForm returnTo={returnTo} />
			<p className='px-8 text-center text-sm text-muted-foreground'>
				<p className='flex gap-2 text-xs'>
					<span className='hover:text-brand'>Tu n'as pas de compte? </span>
					<Link
						to='/register'
						className='text-main-color hover:text-brand underline-offset-4 hover:underline'
					>
						Inscris-toi
					</Link>
				</p>
			</p>
		</div>
	);
}
