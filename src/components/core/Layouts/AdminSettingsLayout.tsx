import { Outlet } from "react-router-dom";
import { Separator } from "../../ui/separator";
import { SidebarNav } from "../../custom/SidebarNav/sidebarNav";
// import Navbar from "../../custom/header/landingNavbar";
// import { Footer } from "../../custom/footer/footer";

const sidebarNavItems = [
	{
		title: "Compte",
		href: "/admin/settings",
	},
	{
		title: "Configurations",
		href: "/admin/settings/configurations",
	},
	{
		title: "Apparence",
		href: "/admin/settings/appearance",
	},
	{
		title: "Notifications",
		href: "/admin/settings/notifications",
	},
];

export default function SettingsLayout() {
	return (
		<>
			<div className='m-7 border rounded-lg bg-white hidden space-y-6 py-14 px-12 pb-16 md:block'>
				<div className='space-y-0.5'>
					<h2 className='text-2xl font-bold tracking-tight'>Paramètres</h2>
					<p className='text-muted-foreground'>Gérer vos paramètres</p>
				</div>
				<Separator className='my-6' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='lg:w-1/5'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1 lg:max-w-2xl'>
						<Outlet />
					</div>
				</div>
			</div>
			{/* <Footer /> */}
		</>
	);
}
