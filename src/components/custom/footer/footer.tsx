import {
	Apple,
	ChevronRight,
	ChromeIcon,
	Facebook,
	Instagram,
	Mails,
	Smartphone,
} from "lucide-react";
import { Fragment } from "react";

export const footerLinks = [
	{
		label: "Politique de confidentialité",
		path: "/politique-de-confidentialite",
	},
	{
		label: "termes et conditions",
		path: "/termes-et-conditions",
	},
];

export function Logo() {
	return (
		<span className='flex gap-1 font-bold text-xl'>
			<span className='text-main-color'>PROXIBUY</span>
		</span>
	);
}
export const data = [
	{
		name: "info@proxibuy.app",
		link: "mailto:info@proxibuy.app",
		icon: <Mails size={13} key={2} />,
	},
	{
		name: "proxibuy.app",
		link: "https://www.proxibuy.app/",
		icon: <ChromeIcon size={13} key={3} />,
	},
];
export const Footer = () => {
	return (
		<footer className='border-t-4 border-pink-500 mt-10 py-10 bg-gray-800 text-white text-sm'>
			<div className='justify-content  mx-auto w-5/6 gap-4 md:gap-16 flex flex-col md:flex-row flex-wrap '>
				<div className=' basis-1/3 md:mt-0 grow'>
					<Logo />
					<p className='mt-5 text-sm'>
						Oubliez les coûts élevés liés à la recherche de produits et à
						l&apos;acquisition de clients. Proxiby vous offre une solution
						tout-en- un qui simplifie vos recherches.
					</p>
				</div>
				<div className='mt-5 basis-1/4 md:mt-0 grow'>
					<h4 className='font-bold text-xl'>Liens importants</h4>
					{footerLinks.map(
						(item: { label: string; path: string }, key: number) => (
							<a
								key={key}
								href={item.path}
								className='my-2  flex  items-center gap-2 cursor-pointer hover:text-main-color transition-100'
							>
								<span>
									<ChevronRight size={13} />
								</span>
								<span>{item.label}</span>
							</a>
						)
					)}
				</div>
				<div className='grow mb-4 md:mt-0 '>
					<h4 className='font-bold text-xl'>Contacts</h4>
					{data.map(
						(
							item: { name: string; link: string; icon: React.ReactNode },
							key: number
						) => (
							<Fragment key={key}>
								{key < 3 && (
									<p className='my-2 cursor-pointer hover:text-main-color  flex  items-center gap-2'>
										<span>{item.icon}</span>
										<div className='flex flex-wrap gap-2'>
											<a
												href={item.link}
												target={item.link.startsWith("http") ? "_blank" : ""}
												className='transition-100'
											>
												{item.name}
											</a>
											{/* <span className='text-main-color font-bold cursor-pointer hover:underline transition-100'>
											{key === 2 && "voir plus"}
										</span> */}
										</div>
									</p>
								)}
							</Fragment>
						)
					)}{" "}
				</div>
			</div>
			<div className='border-t bg-gray-800 border-main-color mx-2 flex justify-center md:justify-between  gap-5 py-5 px-5 items-center flex-wrap'>
				<p className=' flex gap-2 items-center'>
					{[<Smartphone size={22} key={1} />, <Apple size={22} key={2} />].map(
						(item, key) => (
							<a
								href='/'
								className='cursor-pointer  hover:text-main-color transition-100'
								key={key}
							>
								{item}
							</a>
						)
					)}
				</p>
				<p className='flex gap-2'>
					{[
						// {
						// 	icon:<LinkedinIcon size={20} key={1} />,
						// 	link:"https://www.linkedin.com/company/proxibuy/"

						// },
						// {
						// 	icon:<Twitter size={20} key={2} />,
						// 	link:"https://www.linkedin.com/company/proxibuy/"
						// },
						{
							icon: <Facebook size={20} key={3} />,
							link: "https://www.facebook.com/profile.php?id=61562379254113",
						},
						{
							icon: <Instagram size={20} key={4} />,
							link: "https://www.instagram.com/proxibuy2024/",
						},
					].map((item, key) => (
						<a
							key={key}
							href={item.link}
							target='_blank'
							className='cursor-pointer  hover:text-main-color transition-100'
						>
							{item.icon}
						</a>
					))}
				</p>
				<p className='flex gap-3 font-bold items-center'>
					<div>© {new Date().getFullYear()} Copyright</div> <Logo />
				</p>
			</div>
		</footer>
	);
};
