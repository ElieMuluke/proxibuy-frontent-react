import {
	Home,
	Package,
	Package2,
	Menu,
	ShoppingCart,
	Users2,
} from "lucide-react";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import useAuth from "../../../lib/hooks/use-auth";
import { signOut } from "../../../services/auth";
import "../../../index.css";

export function AdminHeader() {
	const { isAuthenticated } = useAuth();
	// console.log("user session", userSession?.user?.role);
	return (
		<header className='sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 mb-6'>
			<Sheet>
				<SheetTrigger asChild>
					<Button size='icon' variant='outline' className='sm:hidden'>
						<Menu className='h-5 w-5' />
						<span className='sr-only'>Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='sm:max-w-xs'>
					<nav className='grid gap-6 text-lg font-medium'>
						<a
							href='/admin'
							className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
						>
							<Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
							<span className='sr-only'>Acme Inc</span>
						</a>
						<a
							href='/admin'
							className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
						>
							<Home className='h-5 w-5' />
							Tableau de bord
						</a>
						<a
							href='/admin/boutiques'
							className='flex items-center gap-4 px-2.5 text-foreground'
						>
							<ShoppingCart className='h-5 w-5' />
							Boutiques
						</a>
						<a
							href='/admin/parrainage'
							className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
						>
							<Package className='h-5 w-5' />
							Parrainage
						</a>
						<a
							href='/admin/administrateurs'
							className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
						>
							<Users2 className='h-5 w-5' />
							Administrateurs
						</a>
						{/* <Link
							href='/admin/messaging'
							className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
						>
							<LineChart className='h-5 w-5' />
							Messages
						</Link> */}
						{/* <Link
							href='/admin/settings'
							className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
						>
							<LineChart className='h-5 w-5' />
							Paramètres
						</Link> */}
					</nav>
				</SheetContent>
				<div className='block md:hidden'>
					<Avatar>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									size='icon'
									className='overflow-hidden rounded-full'
								>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>TM</AvatarFallback>
									<span className='sr-only'>Toggle avatar</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{!isAuthenticated && (
									<DropdownMenuItem>
										<a href='/auth/login?returnTo=/admin'>Se connecter</a>
									</DropdownMenuItem>
								)}
								{isAuthenticated && (
									<DropdownMenuItem
										onClick={async () => {
											await signOut();
											// location.replace("/login?returnTo=/admin");
											location.reload();
										}}
									>
										Se déconnecter
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</Avatar>
				</div>
			</Sheet>

			<div className='hidden sm:block'></div>
			<Avatar className='hidden md:block'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='overflow-hidden rounded-full'
						>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>TM</AvatarFallback>
							<span className='sr-only'>Toggle avatar</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{!isAuthenticated && (
							<DropdownMenuItem>
								<a href='/auth/login?returnTo=/admin'>Se connecter</a>
							</DropdownMenuItem>
						)}
						{isAuthenticated && (
							<DropdownMenuItem
								onClick={async () => {
									await signOut();
									// location.replace("/login?returnTo=/admin");
									location.reload();
								}}
							>
								Se déconnecter
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</Avatar>
		</header>
	);
}
