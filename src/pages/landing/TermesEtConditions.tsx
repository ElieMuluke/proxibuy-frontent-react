export default function TermesEtConditions() {
	return (
		<div className='flex flex-col h-screen p-10'>
			{/* <Navbar /> */}
			<section className='flex-none h-1/4 w-full bg-[#D41C7B] text-white flex items-center justify-center'>
				<h1 className='text-4xl font-bold text-center'>Termes et Conditions</h1>
			</section>
			<section className='flex-1 h-3/4 w-full overflow-auto bg-white p-4'>
				<div className='space-y-6 text-base'>
					<h2 className='text-xl font-semibold'>Introduction</h2>
					<p>
						Bienvenue sur notre plateforme. En accédant au site et en utilisant
						nos services, vous acceptez les termes et conditions suivants.
						Veuillez les lire attentivement avant d&apos;utiliser notre
						plateforme.
					</p>

					<h2 className='text-xl font-semibold'>1. Acceptation des Termes</h2>
					<p>
						En vous inscrivant et en utilisant la plateforme, vous acceptez de
						respecter et d&apos;être lié par ces termes et conditions. Si vous
						n&apos;acceptez pas ces termes, veuillez ne pas utiliser le site.
					</p>

					<h2 className='text-xl font-semibold'>2. Description des Services</h2>
					<p>
						La plateforme permet aux utilisateurs de créer des boutiques en
						ligne, de publier des produits, et de rechercher des produits à
						l&apos;aide de la reconnaissance d&apos;image et de discuter par
						chat avec les vendeurs. Nous fournissons une interface utilisateur
						intuitive et des outils de gestion pour faciliter ces interactions.
					</p>

					<h2 className='text-xl font-semibold'>
						3. Utilisation de la Plateforme
					</h2>
					<h3 className='text-lg font-semibold'>Inscription</h3>
					<p>
						Pour utiliser certaines fonctionnalités, vous devez créer un compte.
						Vous devez fournir des informations exactes et à jour et maintenir
						la confidentialité de vos identifiants de connexion.
					</p>
					<h3 className='text-lg font-semibold'>
						Conduite de l&apos;Utilisateur
					</h3>
					<p>
						Vous vous engagez à utiliser la plateforme de manière légale et
						respectueuse. Vous ne devez pas utiliser la plateforme pour publier
						des contenus illicites, offensants, ou en violation des droits
						d&apos;autrui.
					</p>
					<h3 className='text-lg font-semibold'>Contenu des Utilisateurs</h3>
					<p>
						Vous êtes responsable de tout contenu que vous publiez sur notre
						plateforme. En publiant du contenu, vous nous accordez une licence
						mondiale, non exclusive, et gratuite pour utiliser, reproduire, et
						distribuer ce contenu dans le cadre de l&apos;exploitation de la
						plateforme.
					</p>

					<h2 className='text-xl font-semibold'>
						4. Politique de Monétisation et Parrainage
					</h2>
					<h3 className='text-lg font-semibold'>Parrainage</h3>
					<p>
						En invitant des boutiques à s&apos;inscrire en utilisant votre code
						parrain comme référence, vous pouvez toucher 1 % des transactions
						financières effectuées par ces boutiques une fois que vous atteignez
						le seuil de 1 000 boutiques parrainées.
					</p>
					<h3 className='text-lg font-semibold'>Conditions</h3>
					<p>
						Vous devez respecter toutes les lois et réglementations applicables
						lors de la promotion de notre plateforme et du recrutement de
						nouveaux utilisateurs.
					</p>

					<h2 className='text-xl font-semibold'>5. Paiements et Abonnements</h2>
					<p>
						Nous offrons une utilisation gratuite pour tous les utilisateurs. À
						l&apos;expiration de cette période, un abonnement payant sera requis
						pour continuer à utiliser les solutions intégrées de la plateforme.
					</p>

					<h2 className='text-xl font-semibold'>6. Propriété Intellectuelle</h2>
					<p>
						Nous vous accordons une licence limitée, non exclusive et non
						transférable pour accéder et utiliser notre plateforme pour vos
						besoins personnels et commerciaux conformément à ces termes.
					</p>

					<h2 className='text-xl font-semibold'>
						7. Limitation de Responsabilité
					</h2>
					<h3 className='text-lg font-semibold'>
						Service &quot;Tel Quel&quot;
					</h3>
					<p>
						Notre plateforme est fournie &quot;tel quel&quot; et &quot;selon
						disponibilité&quot;. Nous ne garantissons pas que les services
						seront ininterrompus ou exempts d&apos;erreurs.
					</p>
					<h3 className='text-lg font-semibold'>Exclusion de Responsabilité</h3>
					<p>
						Dans toute la mesure permise par la loi, nous déclinons toute
						responsabilité pour les dommages directs, indirects, accessoires, ou
						consécutifs découlant de votre utilisation de la plateforme.
					</p>

					<h2 className='text-xl font-semibold'>8. Résiliation</h2>
					<p>
						Nous nous réservons le droit de suspendre ou de résilier votre
						compte à tout moment et pour toute raison, y compris en cas de
						violation de ces termes. En cas de résiliation, vous devez cesser
						immédiatement d&apos;utiliser la plateforme.
					</p>

					<h2 className='text-xl font-semibold'>9. Modifications des Termes</h2>
					<p>
						Nous pouvons modifier ces termes à tout moment. Toute modification
						sera publiée sur cette page et prendra effet immédiatement. Nous
						vous encourageons à consulter régulièrement cette page pour être
						informé de tout changement.
					</p>

					<h2 className='text-xl font-semibold'>
						10. Droit Applicable et Juridiction
					</h2>
					<p>
						Ces termes et conditions sont régis par les lois de notre pays de
						résidence. En utilisant notre plateforme, vous acceptez que tout
						litige soit soumis à la compétence exclusive des tribunaux de notre
						juridiction.
					</p>

					<h2 className='text-xl font-semibold'>11. Contact</h2>
					<p>
						Pour toute question concernant ces termes et conditions, veuillez
						nous contacter à l&apos;adresse suivante:{" "}
						<a
							href='mailto:info@proxibuy.app'
							className='text-main-color font-bold'
						>
							info@proxibuy.app
						</a>
					</p>
				</div>
			</section>
		</div>
	);
}
