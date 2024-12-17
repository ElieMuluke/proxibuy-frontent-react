import { Loader, Loader2 } from "lucide-react";
import { Separator } from "@components/ui/separator";
import { ProductCard } from "@components/custom/cards/productCard";
import { getProductsByStoreId } from "@services/products";
import { useQuery } from "@tanstack/react-query";

export function StoreProducts({
	storeId,
	currentProductId,
}: {
	storeId: string;
	currentProductId?: string;
}) {
	const {
		isLoading: productsLoading,
		isError: productsHasError,
		error: productsError,
		data: products,
	} = useQuery({
		queryKey: ["products", storeId],
		queryFn: () => getProductsByStoreId(storeId),
		// enabled: keyword.length > 0 ? true : false,
	});
	if (productsHasError) return <div>{productsError.message}</div>;
	if (productsLoading) return <Loader2 className='mr-2 h-4 w-4 animate-spin' />;

	const filteredProducts = products.data.items.filter(
		(product: any) => product.id != currentProductId
	);

	return (
		<>
			{filteredProducts && filteredProducts.length > 0 ? (
				<>
					<Separator />
					<div className='my-4 space-y-4'>
						<h1 className='text-xl font-bold'>
							Autres produits de la boutique
						</h1>
						<div className='flex gap-4 w-full overflow-x-auto py-4'>
							{filteredProducts.map((product: any) => (
								<ProductCard
									key={product.id}
									product={product}
									cardType='listing'
								/>
							))}
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
}
