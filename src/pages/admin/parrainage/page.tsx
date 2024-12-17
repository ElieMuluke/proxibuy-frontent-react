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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getParrains } from "../../../services/parrainage";
import { MesssageForm } from "../../../components/custom/form/admin/message";
import { DataTable } from "../../../components/custom/data-tables/data-table";

interface Parrainage {
	id: string;
	countStoresSponsored: number;
	fName: string;
	lName: string;
	cover: string;
	email: string;
	// isActive: boolean;
	// createdAt: string;
	sponsorshipCode: string;
}
interface ParrainageData {
	data: {
		item: {
			parentUserStoresSponsored: Parrainage[];
		};
	};
}

export default function Parrainage() {
	const [keyword, setKeyword] = useState("");
	// const queryClient = useQueryClient();
	useToast();

	const {
		isLoading: parrainsLoading,
		isError: parrainsHasError,
		error: parrainsError,
		data: parrains,
	} = useQuery<ParrainageData>({
		queryKey: ["parrains", keyword],
		queryFn: () => getParrains(keyword),
		// enabled: keyword.length > 0 ? true : false,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	if (parrainsHasError) console.log("error", parrainsError);

	const parrainsColumns: ColumnDef<Parrainage>[] = [
		{
			accessorKey: "cover",
			header: "Image",
			cell: ({ row }) => {
				const parrain = row.original;
				return (
					<img
						alt='Product image'
						className='aspect-square rounded-md object-cover'
						height='64'
						src={parrain.cover || "/avatarPlaceholder.png"}
						width='64'
					/>
				);
			},
		},
		{
			accessorKey: "name",
			header: "Nom",
			cell: ({ row }) => {
				const parrain = row.original;
				return `${parrain.fName} ${parrain.lName}`;
			},
		},
		{
			accessorKey: "status",
			header: "Statut",
			cell: () => {
				return <Badge variant='outline'>{"ACTIF"}</Badge>;
			},
		},
		{
			accessorKey: "sponsorshipCode",
			header: "Code Sponsor",
			cell: ({ row }) => {
				return <Badge variant='outline'>{row.original.sponsorshipCode}</Badge>;
			},
		},
		{
			accessorKey: "countStoresSponsored",
			header: "Referrences totales",
		},
		{
			accessorKey: "createdAt",
			header: "Date d'adhésion",
			cell: () => {
				// return formatToUTC(row.original.createdAt)
				// 	.slice(0, 10)
				// 	.split("-")
				// 	.reverse()
				// 	.join("-");
				return "2023-07-12 10:42 AM";
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const parrain = row.original;

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
								<DropdownMenuLabel className='font-bold'>
									Actions
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<DialogTrigger asChild>
										<Button variant='ghost'>Ecrire un message</Button>
									</DialogTrigger>
								</DropdownMenuItem>
								{/* <DropdownMenuItem>
																			<Button
																				onClick={
																					() => null
																					// handleBlockBoutique({
																					// 	boutiqueId: store?.id,
																					// 	status: store?.isActive
																					// 		? false
																					// 		: true,
																					// })
																				}
																				variant='ghost'
																			>
																				Bloquer
																			</Button>
																		</DropdownMenuItem> */}
							</DropdownMenuContent>
						</DropdownMenu>
						<MesssageForm
							// boutiqueId={parrain?.id}
							ownerId={parrain?.id}
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
								placeholder='Search...'
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
							<CardTitle>Pairrainage</CardTitle>
							<CardDescription>Gérez les parrains du système.</CardDescription>
						</CardHeader>
						<CardContent>
							{parrainsLoading && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							{parrainsHasError && <div>Une erreur est survenue</div>}
							{!parrainsHasError &&
								parrains &&
								(parrains.data.item.parentUserStoresSponsored.length > 0 ? (
									<DataTable
										columns={parrainsColumns}
										data={parrains.data.item.parentUserStoresSponsored}
									/>
								) : (
									<span>
										Il n'y a pas encore de parrain{" "}
										{keyword.length > 0
											? "pour la recherche '" + keyword + "'"
											: "créée !"}
									</span>
								))}
						</CardContent>
						{/* <CardFooter>
							<div className='text-xs text-muted-foreground'>
								<strong>1-10</strong> sur <strong>32</strong> boutiques
							</div>
						</CardFooter> */}
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
