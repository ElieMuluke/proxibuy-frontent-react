export default function PolitiqueDeConfidentialite() {
	return (
		<div className='flex flex-col h-screen p-10'>
			{/* <Navbar /> */}
			<section className='flex-none h-1/4 w-full bg-[#D41C7B] text-white flex items-center justify-center'>
				<h1 className='text-4xl font-bold text-center'>
					Politique de confidentialité
				</h1>
			</section>
			<section className='flex-1 h-3/4 w-full overflow-auto bg-white p-4'>
				<div className='space-y-6 text-base'>
					<h2 className='text-xl font-semibold'>Introduction</h2>
					<p>
						Nous nous engageons à protéger la confidentialité et la sécurité des
						informations personnelles de nos utilisateurs. Cette politique de
						confidentialité décrit comment nous recueillons, utilisons,
						stockons, et protégeons vos informations personnelles lorsque vous
						utilisez notre plateforme. En accédant à notre site et en utilisant
						nos services, vous acceptez les termes de cette politique.
					</p>

					<h2 className='text-xl font-semibold'>
						1. Collecte des Informations
					</h2>
					<p>
						Nous recueillons des informations personnelles que vous nous
						fournissez directement, telles que votre nom, adresse email, numéro
						de téléphone, et informations de paiement. Nous collectons également
						des informations sur votre utilisation de la plateforme, y compris
						les données de navigation, les interactions avec les boutiques, et
						les recherches effectuées.
					</p>

					<h2 className='text-xl font-semibold'>
						2. Utilisation des Informations
					</h2>
					<p>Les informations recueillies sont utilisées pour :</p>
					<ul className='list-disc list-inside pl-8'>
						<li>Faciliter la création et la gestion de votre compte.</li>
						<li>Améliorer la qualité et la pertinence de nos services.</li>
						<li>Vous fournir un support client efficace.</li>
						<li>Personnaliser votre expérience utilisateur.</li>
						<li>
							Effectuer des analyses statistiques pour améliorer nos services.
						</li>
						<li>Respecter nos obligations légales et réglementaires.</li>
					</ul>

					<h2 className='text-xl font-semibold'>3. Partage des Informations</h2>
					<p>
						Nous ne partageons pas vos informations personnelles avec des tiers,
						sauf dans les cas suivants :
					</p>
					<ul className='list-disc list-inside pl-8'>
						<li>Avec votre consentement explicite.</li>
						<li>
							Avec des prestataires de services tiers qui nous aident à fournir
							nos services (par exemple, services de paiement, hébergement,
							etc.).
						</li>
						<li>
							Pour nous conformer aux lois et réglementations applicables ou à
							une demande légale.
						</li>
						<li>
							Pour protéger nos droits, notre propriété, et notre sécurité,
							ainsi que ceux de nos utilisateurs.
						</li>
					</ul>

					<h2 className='text-xl font-semibold'>
						4. Sécurité des Informations
					</h2>
					<p>
						Nous prenons des mesures de sécurité appropriées pour protéger vos
						informations personnelles contre l&apos;accès non autorisé, la
						modification, la divulgation ou la destruction. Cela inclut
						l&apos;utilisation de technologies de cryptage, de pare-feu, et de
						contrôles d&apos;accès stricts.
					</p>

					<h2 className='text-xl font-semibold'>
						5. Cookies et Technologies Similaires
					</h2>
					<p>
						Nous utilisons des cookies et des technologies similaires pour
						améliorer votre expérience sur la plateforme. Les cookies nous
						permettent de vous reconnaître et de retenir vos préférences. Vous
						pouvez gérer vos préférences en matière de cookies via les
						paramètres de votre navigateur.
					</p>

					<h2 className='text-xl font-semibold'>6. Vos Droits</h2>
					<p>Vous avez le droit de :</p>
					<ul className='list-disc list-inside pl-8'>
						<li>Accéder à vos informations personnelles que nous détenons.</li>
						<li>
							Demander la suppression de vos informations personnelles, sous
							réserve de certaines exceptions légales.
						</li>
						<li>
							Vous opposez au traitement de vos informations personnelles.
						</li>
						<li>Demander la portabilité de vos informations personnelles.</li>
					</ul>
					<p>
						Pour exercer ces droits, veuillez nous contacter à l&apos;adresse
						email fournie ci-dessous.
					</p>

					<h2 className='text-xl font-semibold'>
						7. Modifications de la Politique de Confidentialité
					</h2>
					<p>
						Nous nous réservons le droit de modifier cette politique de
						confidentialité à tout moment. Toute modification sera publiée sur
						cette page et prendra effet immédiatement. Nous vous encourageons à
						consulter régulièrement cette page pour être informé de tout
						changement.
					</p>

					<h2 className='text-xl font-semibold'>8. Contact</h2>
					<p>
						Pour toute question ou demande concernant cette politique de
						confidentialité, veuillez nous contacter à l&apos;adresse suivante:{" "}
						<a
							href='mailto:info@proxibuy.app'
							className='text-main-color font-bold'
						>
							info@proxibuy.app
						</a>
					</p>

					<h2 className='text-xl font-semibold'>
						9. Juridiction et Application
					</h2>
					<p>
						Cette politique de confidentialité est régie par les lois en vigueur
						dans notre pays de résidence. En utilisant la plateforme, vous
						acceptez que tout litige relatif à la protection de la vie privée
						soit soumis à la compétence exclusive des tribunaux de notre
						juridiction.
					</p>
				</div>
			</section>
		</div>
	);
}
