import { Header } from "../../custom/header/header";
import { Toaster } from "../../ui/toaster";
// import "../../globals.css";
import { Outlet } from "react-router-dom";

export default function StoreLayout() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='w-3/4 mx-auto'>
				<Outlet />
			</div>
			{/* <Footer /> */}
			<Toaster />
		</div>
	);
}
