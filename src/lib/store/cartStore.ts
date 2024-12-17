import { create } from "zustand";
import { persist } from "zustand/middleware"; // Optional: To persist cart state in localStorage

// Define the cart product type
export interface cartType {
	id: string;
	name: string;
	mainImage: string;
	price: number;
	quantity: number;
	ownerId: string;
}

type CartState = {
	cart: cartType[];
	addProduct: (product: cartType) => void;
	removeProduct: (productId: string) => void;
	updateProductQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cart: [],
			addProduct: (product) => {
				const existingProduct = get().cart.find(
					(item) => item.id === product.id
				);
				if (existingProduct) {
					set({
						cart: get().cart.map((item) =>
							item.id === product.id
								? { ...item, quantity: item.quantity + 1 }
								: item
						),
					});
				} else {
					set({ cart: [...get().cart, { ...product, quantity: 1 }] });
				}
			},
			removeProduct: (productId) => {
				set({ cart: get().cart.filter((item) => item.id !== productId) });
			},
			updateProductQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeProduct(productId); // If quantity is 0 or less, remove the item
				} else {
					set({
						cart: get().cart.map((item) =>
							item.id === productId ? { ...item, quantity } : item
						),
					});
				}
			},
			clearCart: () => set({ cart: [] }),
		}),
		{ name: "cart-store" } // Optional: Persist cart in localStorage
	)
);
