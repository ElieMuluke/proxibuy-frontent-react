import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import useAuth from "../../../lib/hooks/use-auth";
import { subscribeToStore } from "../../../services/boutique";
import { useToast } from "../../ui/use-toast";
import { Button } from "../../ui/button";

interface MutationVariables {
	boutiqueId: string;
}

type MutationResponse = { success: boolean; message: string };
export function StoreDetails({
	store,
	storeSubscribers,
}: {
	store: {
		id: string;
		name: string;
		image: string;
		isActive: boolean;
		description: string;
	};
	storeSubscribers: Array<{ id: string }>;
}) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { isAuthenticated } = useAuth();

	const subscribeStore = useMutation<
		MutationResponse,
		Error,
		MutationVariables
	>({
		mutationFn: ({ boutiqueId }) => subscribeToStore(boutiqueId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stores"] });
			toast({
				variant: "default",
				description: "L'opération a reussie",
			});
		},
		onError: (error: Error) => {
			console.error("Error", error.message);
			toast({
				variant: "destructive",
				description: error.message,
			});
		},
	});

	return (
		<div className='flex flex-col items-center gap-y-6 py-6 px-4 md:flex-row md:items-center md:justify-between w-full bg-white rounded-lg shadow-md'>
			{/* Store Information */}
			<div className='flex flex-col items-center text-center md:items-start md:text-left gap-y-3'>
				<p className='text-xl font-semibold text-gray-800'>{store.name}</p>
				<p className='text-gray-500 max-w-xs'>{store.description}</p>
				<img
					src={store.image}
					alt='store-img'
					className='w-20 h-20 rounded-xl object-cover border-2 border-pink-500'
				/>
			</div>

			{/* Store Status and Subscribers */}
			<div className='flex flex-col items-center gap-y-4'>
				<p className='flex items-center gap-x-2 text-lg font-medium'>
					<Check className='w-5 h-5 text-green-600' />
					<span className={store.isActive ? "text-green-600" : "text-red-600"}>
						{store.isActive ? "Active" : "Inactive"}
					</span>
				</p>
				<p className='text-gray-700'>
					Store subscribers: {storeSubscribers.length}
				</p>
				{isAuthenticated && (
					<Button
						className='bg-[#F6208F] text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out'
						onClick={() => subscribeStore.mutate({ boutiqueId: store.id })}
					>
						Subscribe
					</Button>
				)}
			</div>

			{/* Store Categories and Products */}
			<div className='text-center md:text-left space-y-2'>
				<p className='text-lg font-medium text-gray-800'>
					Categories de produits
				</p>
				<p className='text-gray-700'>Nombre de produits</p>
			</div>
		</div>
	);
}
