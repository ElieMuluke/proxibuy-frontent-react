import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";
import { HomeIcon, MoveRight } from "lucide-react";

const FAQs = [
	{
		question: "Comment fonctionne la recherche par reconnaissance d'image ?",
		reponse:
			"La plateforme innovante vous permet de trouver exactement ce que vous cherchez en un clin d'oeil. Utilisez simplement votre appareil pour prendre une photo de l'objet que vous désirez ou la télécharger. Grâce à notre technologie de reconnaissance d'image avancée, nous analysons votre photo et vous présentons les boutiques locales offrant des produits similaires. Simplifiez vos recherches et découvrez les trésors cachés dans votre région, le tout sans effort !",
	},
	{
		question: "Comment puis-je créer ma boutique en ligne sur la plateforme ?",
		reponse:
			"Créer votre boutique en ligne sur la plateforme est rapide et intuitif. Inscrivez-vous et suivez nos instructions pas à pas pour personnaliser votre espace de vente. Choisissez une catégorie parmi les nombreuses options disponibles (automobile, habillement, décoration, construction, etc.), ajoutez vos produits, et commencez à attirer des clients. Profitez de notre interface conviviale et de nos outils puissants pour développer votre présence en ligne et accroitre considérablement vos ventes.",
	},
	{
		question: "Est-ce que l'inscription à la plateforme est gratuite ?",
		reponse:
			"Absolument ! Nous offrons une utilisation gratuite pour vous permettre de découvrir toutes les fonctionnalités exceptionnelles de la plateforme. Profitez de cet accès gratuit pour créer votre boutique, ajouter des produits, et explorer notre système de recherche intelligent. Une fois l'essai terminé, vous pourrez choisir parmi nos plans d'abonnement compétitifs pour continuer à bénéficier de notre service premium.",
	},
	{
		question:
			"Comment puis-je être sûr que les produits affichés sont disponibles dans ma région ?",
		reponse:
			"La plateforme utilise une technologie de géolocalisation précise pour vous montrer uniquement les produits disponibles dans votre région. Vous pouvez ajuster vos préférences géographiques pour élargir ou restreindre la zone de recherche selon vos besoins. Fini les mauvaises surprises : trouvez rapidement et facilement les articles que vous désirez, là où vous en avez besoin.",
	},
	{
		question: "Que faire si j'ai un problème avec un vendeur ou un produit ?",
		reponse:
			"La satisfaction de nos utilisateurs est notre priorité. Si vous rencontrez un problème avec un vendeur ou un produit, notre équipe de service client dédiée est là pour vous aider. Contactez-nous via notre contact sur la plateforme, et nous nous engageons à résoudre votre problème rapidement et efficacement, afin que vous puissiez continuer à profiter de votre expérience sur la plateforme en toute sérénité.",
	},
	{
		question:
			"Comment fonctionne la politique de parrainage et de monétisation ?",
		reponse:
			"Nous croyons en la puissance du réseau et de la collaboration. En parrainant de nouvelles boutiques sur la plateforme, vous pouvez gagner de l'argent ! Invitez des vendeurs à créer leurs boutiques en ligne en utilisant votre code parrain comme référence. Une fois que vous atteignez le seuil de 1 000 boutiques sous votre parrainage, vous commencez à toucher 1 % des transactions financières effectuées par ces boutiques. Partagez votre expérience sur les réseaux sociaux et dans vos cercles, incitez d'autres commerçants à rejoindre notre communauté dynamique, et transformez vos connexions en revenus concrets. Avec nous, votre succès est entre vos mains !",
	},
];
const MEDIA_URL = {
	logo: "/logo_rose.png",
	img1: "/landing_assets/img1.PNG",
	img2: "/landing_assets/img2.PNG",
	img3: "/landing_assets/img3.png",
	img4: "/landing_assets/img4.png",
	URL_eCommerce: "/assets/eCommerce.png",
	playStoreIcon: "/assets/playStoreImg.png",
	appStoreIcon: "/assets/appStoreImg.png",
};

const BtnCustom = ({
	width,
	title,
	link,
}: {
	width: string;
	title: string;
	link: string;
}) => {
	const BTN_STYLE = `${
		width ? width : "w-full"
	} px-4 py-2 transition-all flex rounded-full`;

	return (
		<a
			href={link}
			className={`${BTN_STYLE} text-white items-center text-center bg-main-color gap-2 justify-center md:gap-4 hover:border-main-color hover:bg-white hover:text-main-color border border-transparent`}
		>
			<p className='flex gap-2 items-center'>
				{title} <MoveRight />
			</p>
		</a>
	);
};

const pricingPlans = {
	monthly: [
		{
			title: "Gratuit",
			price: "0$ / mois",
			features: [
				"1 catégorie",
				"3 produits",
				"1 image par produit",
				"Pas de partage de lien",
				"Pas d'intégration des réseaux sociaux",
				"Pas de messagerie",
			],
			buttonLabel: "Commencer",
			bgColor: "bg-pink-500",
			textColor: "text-white",
			btnColor: "bg-white text-pink-500",
		},
		{
			title: "Basique",
			price: "6,99$ / mois",
			features: [
				"1 catégorie",
				"25 produits",
				"3 images par produit",
				"Partage produit et boutique",
				"Intégration réseaux sociaux",
				"Messagerie",
			],
			buttonLabel: "Choisir",
			bgColor: "bg-white",
			textColor: "text-gray-800",
			btnColor: "bg-pink-500 text-white",
		},
		{
			title: "Standard",
			price: "9,99$ / mois",
			features: [
				"2 catégories",
				"50 produits par catégorie",
				"4 images par produit",
				"Partage produit et boutique",
				"Intégration réseaux sociaux",
				"Messagerie + facture proforma",
			],
			buttonLabel: "Choisir",
			bgColor: "bg-white",
			textColor: "text-gray-800",
			btnColor: "bg-pink-500 text-white",
		},
		{
			title: "Pro",
			price: "12,99$ / mois",
			features: [
				"3 catégories",
				"100 produits par catégorie",
				"5 images par produit",
				"Partage produit et boutique",
				"Intégration réseaux sociaux",
				"Messagerie + notifications avancées + facture proforma",
			],
			buttonLabel: "Choisir",
			bgColor: "bg-pink-500",
			textColor: "text-white",
			btnColor: "bg-white text-pink-500",
		},
	],
	yearly: [
		{
			title: "Gratuit",
			price: "0$ / an",
			features: [
				"1 catégorie",
				"3 produits",
				"1 image par produit",
				"Pas de partage de lien",
				"Pas d'intégration des réseaux sociaux",
				"Pas de messagerie",
			],
			buttonLabel: "Commencer",
			bgColor: "bg-pink-500",
			textColor: "text-white",
			btnColor: "bg-white text-pink-500",
		},
		{
			title: "Basique",
			price: "69$ / an (2 mois offerts)",
			features: [
				"1 catégorie",
				"25 produits",
				"3 images par produit",
				"Partage produit et boutique",
				"Intégration réseaux sociaux",
				"Messagerie",
			],
			buttonLabel: "Choisir",
			bgColor: "bg-white",
			textColor: "text-gray-800",
			btnColor: "bg-pink-500 text-white",
		},
		{
			title: "Standard",
			price: "99$ / an (2 mois offerts)",
			features: [
				"2 catégories",
				"50 produits par catégorie",
				"4 images par produit",
				"Partage produit et boutique",
				"Intégration réseaux sociaux",
				"Messagerie + facture proforma",
			],
			buttonLabel: "Choisir",
			bgColor: "bg-white",
			textColor: "text-gray-800",
			btnColor: "bg-pink-500 text-white",
		},
		{
			title: "Pro",
			price: "129$ / an (2 mois offerts)",
			features: [
				"3 catégories",
				"100 produits par catégorie",
				"5 images par produit",
				"Partage produit et boutique",
				"Intégration réseaux sociaux",
				"Messagerie + notifications avancées + facture proforma",
			],
			buttonLabel: "Choisir",
			bgColor: "bg-pink-500",
			textColor: "text-white",
			btnColor: "bg-white text-pink-500",
		},
	],
};

function Landingpage() {
	const BTN_STYLE = `transition-all flex rounded-md`;
	return (
		<div>
			{/* <div className='flex flex-col justify-center md:flex-row md:justify-between items-center gap-8'>
				<div className='w-full md:w-11/12'>
					<SearchBar placeholder='Trouver un produit' type='produit' />
				</div>
				<div className='flex items-center underline underline-offset-4 md:w-2/6'>
					<MapPin className='text-gray-500' />{" "}
					<span className='text-gray-500'>Bukavu, Sud-kivu</span>
				</div>
				<div className='w-full md:w-11/12'>
					<SearchBar placeholder='Trouver un Immobilier' type='immobilier' />
				</div>
			</div> */}
			<div className=''>
				{/* <div> */}
				<Tabs defaultValue='home'>
					<TabsList className='hidden'>
						<TabsTrigger value='home'>
							<HomeIcon />
						</TabsTrigger>
						{/* <TabsTrigger value='explore'>Explore</TabsTrigger> */}
					</TabsList>
					<TabsContent value='home' className='tracking-wide'>
						<div className='background-circles flex flex-col items-center justify-center space-y-16 px-8 md:px-14 py-6'>
							<div className='circle-pink'></div>
							<div className='circle-light-pink'></div>
							<section
								id='create-boutique'
								className='flex flex-col md:flex-row items-center justify-center md:space-x-16'
							>
								<div className='text-center md:text-left md:w-1/2 space-y-4 z-10'>
									<h2 className='text-4xl font-bold text-gray-800'>
										Créez votre Boutique, et Amplifiez vos ventes
									</h2>
									<p className='text-gray-600'>
										Créez votre propre boutique en ligne sur proxibuy, mettez y
										vos produits selon les catégories qu'offre votre boutique et
										laissez accroître vos ventes de manière phénoménale.
									</p>
									<div className='hidden md:inline-block md:w-full'>
										<BtnCustom
											title='Télécharger ici!'
											link='#download-app'
											width='sm:w-2/6 w-full'
										/>
									</div>
								</div>
								<div className='hidden md:w-1/2 md:flex justify-center mt-8 md:mt-0 z-10'>
									<img
										src={MEDIA_URL.img2}
										alt='Creez votre Boutique'
										className='w-3/4 md:w-full'
									/>
								</div>
								<div className='inline-block md:hidden mb-4 mt-8'>
									<BtnCustom
										title='Télécharger ici!'
										link='#download-app'
										width='sm:w-2/6 w-full'
									/>
								</div>

								<div className='md:hidden md:w-1/2 flex justify-center mt-8 md:mt-0 z-10'>
									<img
										src={MEDIA_URL.img2}
										alt='Creez votre Boutique'
										className='md:hidden w-3/4 md:w-full'
									/>
								</div>
							</section>

							<section className='flex flex-col md:flex-row items-center justify-center md:space-x-16'>
								<div className='md:w-1/2 hidden md:flex justify-center mt-8 md:mt-0 z-10'>
									<img
										src={MEDIA_URL.img1}
										alt='Proxibuy'
										className='w-3/4 md:w-full'
									/>
								</div>
								<div className='flex flex-col text-center md:text-left md:w-1/2 space-y-4 sm:space-y-4 z-10'>
									<h1 className='text-4xl font-bold text-gray-800'>
										Avec Proxibuy, dites adieu aux démarches épuisantes et
										inefficaces
									</h1>
									<p className='text-gray-600' id='start'>
										Proxibuy vous offre une solution tout en un qui simplifie
										vos recherches, optimise votre visibilité, amplifie votre
										clientèle et réduit considérablement vos dépenses.
										Rejoignez-nous et découvrez la tranquillité que procure une
										solution efficace et intégrée.
									</p>
								</div>
								<div className='md:hidden md:w-1/2 flex justify-center mt-8 md:mt-0 z-10'>
									<img
										src={MEDIA_URL.img1}
										alt='Proxibuy'
										className='w-3/4 md:w-full'
									/>
								</div>
							</section>

							<section
								id='shopping'
								className='flex flex-col md:flex-row items-center justify-center md:space-x-16'
							>
								<div className='text-center md:text-left md:w-1/2 space-y-4 z-10'>
									<h2 className='text-4xl font-bold text-gray-800'>
										Trouvez ce que vous désirez, où vous le souhaitez
									</h2>
									<p className='text-gray-600'>
										Plongez dans une nouvelle ère du shopping, trouvez des
										produits par leur nom ou grâce à la reconnaissance d'images,
										puis découvrez leur disponibilité locale et leur emplacement
										en temps réel. Trouvez ce que vous voulez, où vous le
										désirez et achetez en toute simplicité.
									</p>
								</div>
								<div className='md:w-1/2 flex justify-center mt-8 md:mt-0 z-10'>
									<img
										src={MEDIA_URL.img3}
										alt='Trouvez ce que vous désirez'
										className='w-3/4 md:w-full'
									/>
								</div>
							</section>

							<section
								id='win-money'
								className='flex flex-col items-center justify-center md:flex-row md:space-x-16 space-y-6 md:space-y-0'
							>
								<div className='md:w-1/2 hidden md:flex justify-center mt-8 md:mt-0 z-10'>
									<img
										src={MEDIA_URL.img4}
										alt="Gagnez l'argent avec Proxibuy"
										className='w-3/4 md:w-full'
									/>
								</div>
								<div className='text-center md:text-left md:w-1/2 space-y-4 z-10'>
									<h2 className='text-4xl font-bold text-gray-800'>
										Gagnez l'argent avec Proxibuy, Oui c'est possible
									</h2>
									<p className='text-gray-600'>
										Atteignez un seuil de 1000 boutiques sous votre parrainage
										et commencez à gagnez 1% des opérations financières
										réalisées par votre système.
									</p>
								</div>
								<div className='md:w-1/2 flex md:hidden justify-center mt-8 md:mt-0 z-10'>
									<img
										src={MEDIA_URL.img4}
										alt="Gagnez l'argent avec Proxibuy"
										className='w-3/4 md:w-full'
									/>
								</div>
							</section>

							<section
								className='w-full py-16 bg-gradient-to-b from-white to-gray-50'
								id='pricing'
							>
								<div className='text-center mb-10'>
									<h2 className='text-5xl font-bold text-gray-800 mb-4'>
										Choisissez votre Plan
									</h2>
									<p className='text-xl text-gray-600'>
										Sélectionnez le plan qui correspond le mieux à vos besoins
									</p>
								</div>

								<Tabs defaultValue='yearly' className='w-full'>
									<TabsList className='flex justify-center mb-8 bg-white'>
										<TabsTrigger
											value='monthly'
											className='px-4 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg mx-2 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500'
										>
											Mensuel
										</TabsTrigger>
										<TabsTrigger
											value='yearly'
											className='px-4 py-2 font-semibold text-white bg-pink-500 border border-pink-500 rounded-lg mx-2 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-lg transform scale-110'
										>
											Annuel (2 mois offerts)
										</TabsTrigger>
									</TabsList>

									<TabsContent value='monthly'>
										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
											{pricingPlans.monthly.map((plan, index) => (
												<div
													key={index}
													className={`relative group ${
														plan.title === "Standard"
															? "border-2 border-pink-500"
															: ""
													} ${plan.bgColor} ${
														plan.textColor
													} p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300 ease-in-out`}
												>
													<div className='relative z-10'>
														<h3 className='text-2xl font-bold mb-4'>
															{plan.title}{" "}
															{plan.title === "Standard" && (
																<span className='text-sm bg-yellow-300 text-yellow-800 px-2 py-1 rounded-lg ml-2'>
																	Budget-friendly
																</span>
															)}
														</h3>
														<p className='text-xl font-semibold mb-6'>
															{plan.price}
														</p>
														<ul className='space-y-4 text-left'>
															{plan.features.map((feature, i) => (
																<li key={i}>{feature}</li>
															))}
														</ul>
														{/* <button
															className={`mt-8 ${plan.btnColor} font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300`}
														>
															{plan.buttonLabel}
														</button> */}
													</div>
												</div>
											))}
										</div>
									</TabsContent>

									<TabsContent value='yearly'>
										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
											{pricingPlans.yearly.map((plan, index) => (
												<div
													key={index}
													className={`relative group ${
														plan.title === "Standard"
															? "border-4 border-pink-500 scale-105"
															: ""
													} ${plan.bgColor} ${
														plan.textColor
													} p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300 ease-in-out`}
												>
													<div className='relative z-10'>
														<h3 className='text-2xl font-bold mb-4'>
															{plan.title}{" "}
															{plan.title === "Standard" && (
																<span className='text-sm bg-yellow-300 text-yellow-800 px-2 py-1 rounded-lg ml-2'>
																	Budget-friendly
																</span>
															)}
														</h3>
														<p className='text-xl font-semibold mb-6'>
															{plan.price}
														</p>
														<ul className='space-y-4 text-left'>
															{plan.features.map((feature, i) => (
																<li key={i}>{feature}</li>
															))}
														</ul>
														{/* <button
															className={`mt-8 ${plan.btnColor} font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300`}
														>
															{plan.buttonLabel}
														</button> */}
													</div>
												</div>
											))}
										</div>
									</TabsContent>
								</Tabs>
							</section>

							<section className='w-full md:w-5/6 py-4' id='FAQ'>
								<h2 className='text-4xl font-bold text-center text-[#F6208F]'>
									Questions fréquemment posées (FAQ)
								</h2>
								<div className='text-base p-2 md:p-16'>
									<Accordion type='single' collapsible className='w-full'>
										{FAQs.map((faqItem, idx) => (
											<AccordionItem key={idx} value={idx.toString()}>
												<AccordionTrigger className='hover:decoration-pink-500 hover:text-[#D41C7B]'>
													{faqItem.question}
												</AccordionTrigger>
												<AccordionContent className='p-4 text-justify'>
													{faqItem.reponse}
												</AccordionContent>
											</AccordionItem>
										))}
									</Accordion>
								</div>
							</section>

							<section className='w-full flex flex-col sm:flex-row items-center justify-center sm:justify-evenly space-y-4 bg-[#F6208F] md:bg-gradient-to-r md:from-[#F6208F] md:to-[#fbb6ce] text-white p-8 rounded-lg shadow-lg'>
								<div className='space-y-2' id='download-app'>
									<h2 className='text-2xl md:text-4xl font-bold'>
										Voulez-vous:
									</h2>
									<ul className='list-disc text-base md:text-lg space-y-2 ml-10'>
										<li>Être au bon endroit pour Amplifiez vos ventes</li>
										<li>Trouvez des produits en un clic</li>
										<li>Éviter des courses stériles</li>
										<li>Trouvez ce que vous souhaitez, là où vous le voulez</li>
									</ul>
									<p className='text-base md:text-lg'>
										Proxibuy est la solution qu'il vous faut !
									</p>
								</div>
								<div>
									<p className='text-2xl mt-4'>
										Téléchargez nos applications ici:
									</p>
									<div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-4 md:space-y-0 mt-4'>
										<a
											href='#'
											className={`${BTN_STYLE} p-4 w-full md:w-auto flex gap-3 items-center bg-white`}
										>
											<img
												src={MEDIA_URL.playStoreIcon}
												alt='proxibuy-playstore'
												width={25}
												height={25}
											/>
											<strong className='font-bold text-black'>
												Play store
											</strong>
										</a>
										<a
											href='#'
											className={`${BTN_STYLE} p-4 w-full md:w-auto flex gap-3 items-center bg-white`}
										>
											<img
												src={MEDIA_URL.appStoreIcon}
												alt='proxibuy-appstore'
												width={25}
												height={25}
											/>
											<span className='font-bold text-black'>App store</span>
										</a>
									</div>
								</div>
							</section>
						</div>
					</TabsContent>
					{/* <TabsContent value='explore'>
						<div className='flex flex-wrap gap-4'>
							<div className='space-y-4 '>
								<h2 className='text-2xl font-semibold my-4'>Produits</h2>
								<div className='flex flex-col flex-wrap md:flex-row gap-4'>
									{products.map((product) => (
										<ProductCard
											key={product.id}
											product={product}
											cardType='listing'
										/>
									))}
								</div>
							</div>
							<div className='space-y-4'>
								<h2 className='text-2xl font-semibold my-4'>Immobilier</h2>
								<div className='flex flex-col md:flex-row flex-wrap gap-4'>
									{realEstate.map((property) => (
										<EstateCard key={property.id} property={property} />
									))}
								</div>
							</div>
						</div>
					</TabsContent> */}
				</Tabs>
				{/* </div> */}
			</div>
		</div>
	);
}

export default Landingpage;
