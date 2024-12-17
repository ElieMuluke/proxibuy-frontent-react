import { ArrowLeft } from "lucide-react";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../ui/button";
import { Toaster } from "../../ui/toaster";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
	children?: React.ReactNode;
}

/**
 * LandingLayout - Main layout component for landing pages
 * Includes navigation, content area, and footer
 */
const AuthLayout: React.FC<AuthLayoutProps> = () => {
	return (
		<>
			<div className='w-3/4 mx-auto'>
				<div className='container flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden'>
					<a
						href='/'
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"absolute left-4 top-4 md:left-8 md:top-8"
						)}
					>
						<>
							<ArrowLeft />
							Retour
						</>
					</a>
					<Outlet />
				</div>
			</div>
			<Toaster />
		</>
	);
};
export default AuthLayout;
