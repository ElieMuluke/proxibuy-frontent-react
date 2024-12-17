import { Button } from "@components/ui/button";
import { cartType, useCartStore } from "@lib/store/cartStore";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";

export const AddToCartButton = ({ product }: { product: cartType }) => {
	const { cart, addProduct, removeProduct, updateProductQuantity } =
		useCartStore();
	const item = cart.find((item) => item.id === product.id);
	const quantity = item ? item.quantity : 0;

	return (
		<div className='flex items-center space-x-2'>
			<Button
				onClick={() => {
					if (quantity === 1) {
						removeProduct(product.id); // Remove product if quantity is 1
					} else {
						updateProductQuantity(product.id, quantity - 1); // Decrease quantity
					}
				}}
				className={`hover:bg-transparent px-4 py-2 text-xl font-bold transition-colors duration-200 ${
					quantity === 1 ? "cursor-pointer text-red-500" : "text-gray-800"
				}`}
				variant='ghost'
			>
				{quantity <= 1 ? <Trash2 /> : <CircleMinus />}
			</Button>

			<span className='px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-md'>
				{quantity}
			</span>

			<Button
				variant='ghost'
				onClick={() => addProduct(product)}
				className='hover:bg-transparent px-4 py-2 text-xl font-bold transition-colors duration-200 text-gray-800'
			>
				<CirclePlus />
			</Button>
		</div>
	);
};
