import { CircleUser, MapPin, ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
export function EstateCard({
	property,
}: {
	property: {
		id: number;
		name: string;
		description: string;
		etat: string;
		price: number;
		image: string;
	};
}) {
	return (
		<div className='w-full rounded-md border border-gray-200 md:w-1/4 hover:shadow-xl hover:transition hover:scale-105 ease-in-out duration-500'>
			<a href={`/app/products/${property.id}`}>
				<div className='relative text-white'>
					<img
						src={property.image}
						width={350}
						height={350}
						className='rounded-t-md'
						alt={property.name}
					/>
					<div className='absolute bottom-2 right-2 flex items-center'>
						<button className='bg-[#F6208F] p-1 rounded-full shadow-md hover:bg-gray-400'>
							<ShoppingCart />
						</button>
					</div>
					<div className='absolute top-2 left-2 flex items-center'>
						<button className='bg-[#F6208F] p-1 rounded-full shadow-md hover:bg-gray-400'>
							<CircleUser className='text-white' />
						</button>
						<span className='ml-2 bg-gray-600 p-1 rounded shadow-md'>
							user name
						</span>
					</div>
				</div>
				<div className='p-4 space-y-2'>
					<div className='flex'>
						<MapPin className='text-[#F6208F]' />{" "}
						<span className='text-[#F6208F]'>Bukavu, Sud-kivu</span>
					</div>
					<h3 className='text-lg font-semibold'>{property.name}</h3>
					<p className='text-gray-700'>{property.description}</p>
				</div>
			</a>
			<div className='p-4 flex flex-wrap justify-center md:justify-between items-center'>
				<p className='text-gray-800 font-semibold'>
					{property.etat === "vente"
						? `$${property.price}`
						: `$${property.price}/mois`}
				</p>

				<Button className='bg-[#F6208F] transition ease-in-out duration-300'>
					Contact Owner
				</Button>
			</div>
		</div>
	);
}
