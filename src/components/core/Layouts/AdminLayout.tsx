import {
	Home,
	Package,
	Settings,
	Store,
	Users2,
	MessagesSquare,
} from "lucide-react";
import {
	TooltipProvider,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../ui/tooltip";
import { AdminHeader } from "../../custom/header/adminHeader";
import { Toaster } from "../../ui/toaster";
import { Outlet } from "react-router-dom";

interface AdminLayoutProps {
	children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
	return (
		<>
			<div className='w-full mx-auto flex flex-col h-screen justify-between'>
				{/* <Header /> */}
				<main className='mb-auto'>
					<div className='flex min-h-screen w-full flex-col bg-muted/40'>
						<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
							<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
								<a
									href='/admin'
									className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
								>
									<img
										src='/logo_rose.png'
										width={80}
										height={80}
										alt='proxibuy-logo'
									/>
								</a>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href='/admin'
												className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
											>
												<Home className='h-5 w-5' />
												<span className='sr-only'>Tableau de bord</span>
											</a>
										</TooltipTrigger>
										<TooltipContent side='right'>
											Tableau de bord
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href='/admin/boutiques'
												className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
											>
												<Store className='h-5 w-5' />
												<span className='sr-only'>Boutiques</span>
											</a>
										</TooltipTrigger>
										<TooltipContent side='right'>Boutiques</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href='/admin/parrainage'
												className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
											>
												<Package className='h-5 w-5' />
												<span className='sr-only'>Parrainage</span>
											</a>
										</TooltipTrigger>
										<TooltipContent side='right'>Parrainage</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href='/admin/administrateurs'
												className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
											>
												<Users2 className='h-5 w-5' />
												<span className='sr-only'>Administrateurs</span>
											</a>
										</TooltipTrigger>
										<TooltipContent side='right'>
											Administrateurs
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href='/admin/messaging'
												className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
											>
												<MessagesSquare className='h-5 w-5' />
												<span className='sr-only'>Messages</span>
											</a>
										</TooltipTrigger>
										<TooltipContent side='right'>Messages</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</nav>
							<nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href='/settings/configurations'
												className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
											>
												<Settings className='h-5 w-5' />
												<span className='sr-only'>Paramètres</span>
											</a>
										</TooltipTrigger>
										<TooltipContent side='right'>Paramètres</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</nav>
						</aside>
						<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
							<AdminHeader />
							<Outlet />
						</div>
					</div>
				</main>
			</div>
			<Toaster />
		</>
	);
};
export default AdminLayout;
