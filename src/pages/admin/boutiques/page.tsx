import { Loader2, MoreHorizontal, Search } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	activer_desactiver_Boutique,
	getBoutiques,
} from "../../../services/boutique";
import { formatToUTC } from "../../../lib/utils";
import { useToast } from "../../../components/ui/use-toast";
import { MesssageForm } from "../../../components/custom/form/admin/message";
import { useState } from "react";
import { DataTable } from "../../../components/custom/data-tables/data-table";

interface Store {
	id: string;
	name: string;
	image: string;
	ownerId: string;
	isActive: boolean;
	createdAt: string;
}

interface StoresData {
	data: {
		items: Store[];
	};
}

interface MutationVariables {
	boutiqueId: string;
	status: boolean;
}

type MutationResponse = {
	success: boolean;
	message: string;
};

export default function Boutiques() {
	const [keyword, setKeyword] = useState("");
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const {
		isLoading: storesLoading,
		isError: storesHasError,
		error: storesError,
		data: stores,
	} = useQuery<StoresData>({
		queryKey: ["stores", keyword],
		queryFn: () => getBoutiques({ keyword }),
		// enabled: keyword.length > 0 ? true : false,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	const blockBoutique = useMutation<MutationResponse, Error, MutationVariables>(
		{
			mutationFn: ({ boutiqueId, status }) =>
				activer_desactiver_Boutique(boutiqueId, status),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["stores"] });
				toast({
					variant: "default",
					description: "L'opération a reussie",
				});
			},
			onError: (error: Error) => {
				console.error("Error", error);
				toast({
					variant: "destructive",
					description: "L'opération n'a pas reussie",
				});
			},
		}
	);

	function handleBlockBoutique({
		boutiqueId,
		status,
	}: {
		boutiqueId: string;
		status: boolean;
	}) {
		console.log("block boutique", { boutiqueId, status });
		blockBoutique.mutate({ boutiqueId, status });
	}

	if (storesHasError) console.log("error", storesError);

	const storesColumns: ColumnDef<Store>[] = [
		{
			accessorKey: "image",
			header: "Image",
			cell: ({ row }) => {
				const store = row.original;
				return (
					<img
						alt='Product image'
						className='aspect-square rounded-md object-cover'
						height='64'
						src={store.image || "/avatarPlaceholder.png"}
						width='64'
					/>
				);
			},
		},
		{
			accessorKey: "name",
			header: "Noms",
		},
		{
			accessorKey: "status",
			header: "Statut",
			cell: ({ row }) => {
				return (
					<Badge variant='outline'>
						{row.original.isActive ? "ACTIF" : "INACTIF"}
					</Badge>
				);
			},
		},
		{
			accessorKey: "totalSales",
			header: "Ventes totales",
			cell: () => {
				return 0;
			},
		},
		{
			accessorKey: "createdAt",
			header: "Date de création",
			cell: ({ row }) => {
				return formatToUTC(row.original.createdAt)
					.slice(0, 10)
					.split("-")
					.reverse()
					.join("-");
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const store = row.original;

				return (
					<Dialog>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button aria-haspopup='true' size='icon' variant='ghost'>
									<MoreHorizontal className='h-4 w-4' />
									<span className='sr-only'>Toggle menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem>
									<DialogTrigger asChild>
										<Button variant='ghost'>Ecrire un message</Button>
									</DialogTrigger>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Button
										onClick={
											() =>
												handleBlockBoutique({
													boutiqueId: store?.id,
													status: store?.isActive ? false : true,
												})
											// console.log("payload", {
											// 	boutiqueId: store?.id,
											// 	status: store?.isActive
											// 		? false
											// 		: true,
											// })
										}
										variant='ghost'
									>
										{blockBoutique.isPending && (
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										)}
										{store?.isActive === true ? "Bloquer" : "Debloquer"}{" "}
										boutique
									</Button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<MesssageForm
							// boutiqueId={store?.id}
							ownerId={store?.ownerId}
						/>
					</Dialog>
				);
			},
		},
	];

	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
			<Tabs defaultValue='all'>
				<div className='flex items-center'>
					<TabsList>
						<TabsTrigger value='all'>Tout</TabsTrigger>
						{/* <TabsTrigger value='active'>Actives</TabsTrigger>
						<TabsTrigger value='inactive' className='hidden sm:flex'>
							Inactives
						</TabsTrigger> */}
					</TabsList>
					<div className='ml-auto flex items-center gap-2'>
						<div className='relative ml-auto flex-1 md:grow-0'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								placeholder='Rechercher...'
								value={keyword}
								onChange={handleInputChange}
								className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
							/>
						</div>
					</div>
				</div>
				<TabsContent value='all'>
					<Card x-chunk='dashboard-06-chunk-0'>
						<CardHeader>
							<CardTitle>Boutiques</CardTitle>
							<CardDescription>Gérez les boutiques du système.</CardDescription>
						</CardHeader>
						<CardContent>
							{storesLoading && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							{storesHasError && <div>Une erreur est survenue</div>}
							{!storesHasError &&
								stores &&
								(stores.data.items && stores.data.items.length > 0 ? (
									<DataTable columns={storesColumns} data={stores.data.items} />
								) : (
									<span>
										Il n'y a pas encore de boutique{" "}
										{keyword.length > 0
											? "pour la recherche '" + keyword + "'"
											: "créée !"}
									</span>
								))}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
