import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../ui/carousel";

export const substringTextToText = (text: string, nbMax: number) => {
	if (text && text.length > nbMax) {
		return <span title={text}>{text.substring(0, nbMax)}... </span>;
	}
	return text;
};

const data = [
	{
		name: "Sarah  Mathe",
		img: "https://res.cloudinary.com/chanel-muhesi/image/upload/v1709290047/altvip-ag-ma/imageHero_pnjeeb.jpg",
		// img: "https://res.cloudinary.com/chanel-muhesi/image/upload/v1666642192/memoire-ia/pic2_k7xxaz.jpg",
		content:
			"Une expérience incroyable ! Grâce à cet outil, notre entreprise a vu une augmentation significative de nos ventes en ligne. Simple à utiliser et efficace, il a vraiment fait la différence.",
		role: "Entrepreneuse",
	},
	{
		name: "Roger MUKANDA",
		img: "https://res.cloudinary.com/chanel-muhesi/image/upload/v1666641924/memoire-ia/pict_nvlivr.jpg",
		content:
			"J’ai été agréablement surpris par les résultats obtenus grâce à cet outil. Mon chiffre d’affaires a augmenté de manière significative, et je suis impatient de découvrir les autres fonctionnalités que l’équipe mettra en place.",
		role: "Dr de commun. chez shop KIN-BUSINESS",
	},
	{
		name: "MUHESI Mugisho",
		img: "https://res.cloudinary.com/chanel-muhesi/image/upload/v1665867359/orgi_2_aotayp.jpg",
		content:
			"Cet outil de marketing digital est devenu un pilier essentiel de notre stratégie commerciale. Il a non seulement augmenté nos ventes, mais il a également simplifié notre processus de suivi des performances.",
		role: "Cofondateur de Horizon, Ir Full stack",
	},
	{
		name: "Rosette MASIKA",
		img: "https://res.cloudinary.com/chanel-muhesi/image/upload/v1709312867/altvip-ag-ma/pexels-daniel-xavier-1239291_ax2w6m.jpg",
		content:
			"L’utilisation de cet outil a été l’un de nos meilleurs investissements. Nous avons constaté une croissance rapide de notre clientèle et une amélioration de notre image de marque.”",
		role: "Cofondatrice de OKAPI SHOP",
	},
];

function Testimonies() {
	return (
		<div className='w-full mx-auto px-5 my-2 py-3'>
			<Carousel
				opts={{
					align: "start",
				}}
				className='w-full '
			>
				<CarouselContent>
					{data.map((item, key) => (
						<CarouselItem key={key} className='md:basis-1/4 lg:basis-1/3'>
							<CardTestimony item={item} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}

export default Testimonies;

function CardTestimony({ item }: { item: any }) {
	return (
		<div className='drop-shadow-md hover:shadow-2xl h-[425px]  shadow-lg rounded-lg bg-cardTestimonies overflow-hidden'>
			<div>
				<div>
					<img
						height={225}
						width={225}
						className='w-full cover'
						src={item.img}
						alt='...'
					/>
				</div>
				<div className='px-4 py-2 '>
					<div className='border-l border-main-color px-2 mb-2'>
						<h4 className='font-bold'> {item.name}</h4>
						<p className=''>{item.role}</p>
					</div>
					<div>{substringTextToText(item.content as any as string, 120)}</div>
				</div>
			</div>
		</div>
	);
}
