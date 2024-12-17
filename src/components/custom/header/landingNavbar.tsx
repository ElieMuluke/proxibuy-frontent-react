"use client";
import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
	const [activeSection, setActiveSection] = useState("start");

	useEffect(() => {
		const handleScroll = () => {
			const sections = ["start", "pricing", "FAQ", "download-app"];
			let currentSection = "";
			for (const section of sections) {
				const sectionElement = document.getElementById(section);
				if (sectionElement) {
					const { top, bottom } = sectionElement.getBoundingClientRect();
					if (
						top <= window.innerHeight / 2 &&
						bottom >= window.innerHeight / 2
					) {
						currentSection = section;
						break;
					}
				}
			}
			setActiveSection(currentSection);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const getLinkClass = (section: string) =>
		section === activeSection
			? "text-main-color font-bold"
			: "text-gray-700 hover:text-main-color font-bold";
	return (
		<header className='sticky top-0 z-50 flex justify-between items-center px-14 py-6 bg-white'>
			<a href='/' className='flex items-center'>
				<img
					src='/LOGO_PROXIBUY_ROSE_ff2293.svg'
					width={90}
					height={90}
					alt='proxibuy-logo'
				/>
				<div className='text-main-color text-xl font-bold'>Proxibuy</div>
			</a>
			<nav className='hidden sm:flex sm:items-center space-x-4'>
				<a href='/#start' className={getLinkClass("start")}>
					À propos
				</a>
				<a href='/#pricing' className={getLinkClass("pricing")}>
					Prix
				</a>
				<a href='/#FAQ' className={getLinkClass("FAQ")}>
					Questions
				</a>
				<a
					href='/#download-app'
					className='bg-main-color text-white font-bold p-3 rounded-full'
				>
					Télécharger
				</a>
			</nav>
			<div className='sm:hidden'>
				<Sheet>
					<SheetTrigger asChild>
						<Button size='icon' variant='outline' className='sm:hidden'>
							<Menu className='h-5 w-5' />
							<span className='sr-only'>Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='right' className='sm:max-w-xs'>
						<nav className='grid gap-6 text-lg font-medium'>
							<a href='/#start' className={getLinkClass("start")}>
								À propos
							</a>
							<a href='/#pricing' className={getLinkClass("pricing")}>
								Prix
							</a>
							<a href='/#FAQ' className={getLinkClass("FAQ")}>
								Questions
							</a>
							<a href='/#download-app' className={getLinkClass("download-app")}>
								Télécharger
							</a>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
