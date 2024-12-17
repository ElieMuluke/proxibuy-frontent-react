import { Outlet } from "react-router-dom";
import { Footer } from "../../custom/footer/footer";
import Navbar from "../../custom/header/landingNavbar";

interface LandingLayoutProps {
	children?: React.ReactNode;
}

/**
 * LandingLayout - Main layout component for landing pages
 * Includes navigation, content area, and footer
 */
const LandingLayout: React.FC<LandingLayoutProps> = () => {
	return (
		<div className='w-full min-h-screen flex flex-col justify-between'>
			{/* Navbar */}
			<Navbar />

			{/* Main content */}
			<main className=''>
				<Outlet /> {/* This renders child routes */}
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
};
export default LandingLayout;
