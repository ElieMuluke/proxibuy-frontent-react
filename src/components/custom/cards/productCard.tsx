import { MapPin, Tag } from "lucide-react";
export function ProductCard({
	product,
}: {
	product: {
		id: string;
		name: string;
		description: string;
		forSale: string;
		price: number;
		mainImage: string;
		address_country: {
			id: string;
			name: string;
		};
		address_province: {
			id: string;
			name: string;
		};
		owner: {
			id: string;
			fName: string;
		};
	};
	cardType: string;
}) {
	// const router = useRouter();
	const fallbackImage = "/LOGO_PROXIBUY_ROSE_ff2293.png";
	const randomDiscount = Math.floor(Math.random() * 30) + 1; // Random percentage between 1% and 30%
	return (
		<div
			key={product.id}
			className='relative w-full max-w-xs rounded-lg border border-gray-200 hover:shadow-xl transition-transform ease-in-out duration-500'
		>
			<a href={`/app/products/${product.id}`}>
				<div className='relative'>
					<img
						src={product?.mainImage || fallbackImage}
						width={350}
						height={350}
						className='w-full h-48 object-contain rounded-t-lg md:h-64'
						alt={product?.name}
					/>
				</div>
				<div className='p-4 border-t border-gray-300'>
					<div className='flex items-center mb-2'>
						<MapPin size={16} className='text-[#F6208F]' />
						<span className='ml-1 text-sm text-[#F6208F]'>
							{`${product.address_province.name}, ${product.address_country.name}`}
						</span>
					</div>
					<h3 className='text-lg font-extrabold text-black mb-2'>
						{product?.name}
					</h3>
					<p className='flex items-center text-sm text-[#F6208F] mb-4 gap-1'>
						<Tag fill='#F6208F' size={16} />
						{product?.forSale ? "En vente" : "En location"}
					</p>
					<div className='flex items-center space-x-2'>
						<p className='text-xl font-bold text-gray-900'>${product?.price}</p>
						<p className='text-sm text-red-600 line-through'>
							${(product?.price * (1 + randomDiscount / 100)).toFixed(2)}
						</p>
						<span className='inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-red-100 bg-red-600 rounded-full'>
							-{randomDiscount}%
						</span>
					</div>
				</div>
			</a>
		</div>
	);
}
