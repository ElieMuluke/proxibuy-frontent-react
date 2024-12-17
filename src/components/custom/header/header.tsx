import {
	ShoppingCart,
	MessageSquareDot,
	Sheet,
	Menu,
	BellDot,
} from "lucide-react";
import {
	useState,
	useEffect,
	forwardRef,
	ElementRef,
	ComponentPropsWithoutRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../lib/hooks/use-auth";
import { useCartStore } from "../../../lib/store/cartStore";
import { cn } from "../../../lib/utils";
import { signOut } from "../../../services/auth";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { SheetTrigger, SheetContent } from "../../ui/sheet";
import { HeaderNotificationTrail } from "../notifications/headerNotificationTrail";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated, userSession, logout } = useAuth();
	const [pathname, setPathname] = useState("");

	useEffect(() => {
		setPathname(location.pathname);
	}, [location]);

	const cart = useCartStore((state) => state.cart);

	return (
		<>
			<div className='flex mx-10 flex-row justify-between items-center'>
				<a href='/app/products' className='flex items-center'>
					<img
						src='/LOGO_PROXIBUY_ROSE_ff2293.svg'
						width={90}
						height={90}
						alt='proxibuy-logo'
					/>
					<div className='text-main-color text-xl font-bold'>Proxibuy</div>
				</a>
				<NavigationMenu>
					<NavigationMenuList className='hidden md:flex flex-col md:flex-row'>
						<NavigationMenuItem>
							<a href='/app/products'>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Produits
								</NavigationMenuLink>
							</a>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className='hidden md:flex items-center gap-4'>
					{isAuthenticated ? (
						<>
							{/* Notifications Dropdown */}
							<HeaderNotificationTrail />

							{/* Cart Button */}
							<div className='relative'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => navigate("/app/cart")}
								>
									<ShoppingCart />
									{/* Counter Badge */}
									{
										<span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center'>
											{cart.length}
										</span>
									}
								</Button>
							</div>

							{/* Messaging Button */}
							<Button
								variant='ghost'
								size='sm'
								onClick={() => navigate("/app/messaging")}
							>
								<MessageSquareDot />
							</Button>

							{/* Profile Avatar */}
							<Avatar>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='outline' size='icon'>
											<AvatarImage
												src={
													userSession?.cover || "https://github.com/shadcn.png"
												}
												className='object-cover'
											/>
											<AvatarFallback>
												{userSession?.fName?.charAt(0) || "U"}
											</AvatarFallback>
											<span className='sr-only'>Afficher profil</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuLabel>
											{`${userSession?.fName} ${userSession?.lName} (${userSession?.role})`}
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={() => navigate("/app/create-shop")}
										>
											Créer une boutique
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => navigate("/app/manage-stores")}
										>
											Gérer vos boutiques
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => navigate("/app/settings")}>
											Paramètres
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={async () => {
												logout();
												await signOut();
												window.location.reload();
											}}
										>
											Se déconnecter
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</Avatar>
						</>
					) : (
						/* Show login button if not authenticated */
						<div className='flex gap-4 items-center'>
							{/* Cart Button */}
							<div className='relative'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => navigate("/app/cart")}
								>
									<ShoppingCart />
									{/* Counter Badge */}
									{
										<span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center'>
											{cart.length}
										</span>
									}
								</Button>
							</div>
							<a
								className='text-white bg-main-color p-2 rounded'
								href={`/login?returnTo=${encodeURIComponent(pathname)}`}
							>
								Connexion
							</a>
						</div>
					)}
				</div>

				{/* Mobile Menu */}
				<div className='sm:hidden'>
					<Sheet>
						<SheetTrigger asChild>
							<Button size='icon' variant='outline' className='sm:hidden'>
								<Menu className='h-5 w-5' />
								<span className='sr-only'>Ouvrir Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='sm:max-w-xs'>
							<NavigationMenu>
								<NavigationMenuList className='flex flex-col md:flex-row'>
									<NavigationMenuItem>
										<a href='/app/products'>
											<NavigationMenuLink
												className={navigationMenuTriggerStyle()}
											>
												Produits
											</NavigationMenuLink>
										</a>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>

							<div className='flex flex-col md:flex-row items-center gap-4'>
								{isAuthenticated ? (
									<>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant='ghost' size='sm'>
													<span className='flex gap-2'>
														<BellDot /> Notifications
													</span>
												</Button>
											</DropdownMenuTrigger>
											<HeaderNotificationTrail />
										</DropdownMenu>

										<Button
											variant='ghost'
											size='sm'
											onClick={() => navigate("/app/messaging")}
										>
											<span className='flex gap-2'>
												<MessageSquareDot />
												Messages
											</span>
										</Button>

										{/* Profile Avatar */}
										<Avatar>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant='outline' size='icon'>
														<AvatarImage
															src={
																userSession?.cover ||
																"https://github.com/shadcn.png"
															}
														/>
														<AvatarFallback>
															{userSession?.fName?.charAt(0) || "U"}
														</AvatarFallback>
														<span className='sr-only'>Voir profil</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={() => navigate("/app/create-shop")}
													>
														Créer une boutique
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => navigate("/app/manage-stores")}
													>
														Gérer vos boutiques
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => navigate("/app/settings")}
													>
														Paramètres
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={async () => {
															logout();
															await signOut();
															window.location.reload();
														}}
													>
														Se déconnecter
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</Avatar>
									</>
								) : (
									<>
										<div className='relative'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => navigate("/app/cart")}
											>
												<ShoppingCart />
												{/* Counter Badge */}
												{
													<span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center'>
														{cart.length}
													</span>
												}
											</Button>
										</div>
										<Button
											variant='ghost'
											className='text-white bg-main-color hover:bg-main-color hover:text-white'
											size='sm'
											onClick={() => {
												navigate(
													`/login?returnTo=${encodeURIComponent(
														location.pathname
													)}`
												);
											}}
										>
											Connexion
										</Button>
									</>
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</>
	);
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";
