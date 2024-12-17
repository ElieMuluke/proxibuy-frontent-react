import { Loader2, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../../components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../../components/ui/tabs";
import { Input } from "../../../../components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../../components/ui/popover";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatToUTC } from "../../../../lib/utils";
import { Dialog, DialogTrigger } from "../../../../components/ui/dialog";
import { getCountries } from "../../../../services/address";
import { UpdateCountryForm } from "../../../../components/custom/form/admin/updateCountry";
import { AddCountryForm } from "../../../../components/custom/form/admin/addCountry";
import { DataTable } from "../../../../components/custom/data-tables/data-table";
import { AddProvinceForm } from "../../../../components/custom/form/admin/addProvince";
// import { MesssageForm } from "../../../../components/custom/form/admin/message";
// import { AddAdminForm } from "../../../../components/custom/form/admin/addAdmin";

interface Country {
	id: string;
	name: string;
	codePhoneNumber: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

interface CountryData {
	data: {
		items: Country[];
	};
}

// type MutationResponse = {
// 	success: boolean;
// 	message: string;
// 	data?: unknown;
// };
export function ConfigurationScreen() {
	const [keyword, setKeyword] = useState("");
	// const queryClient = useQueryClient();
	// const { toast } = useToast();

	const {
		isLoading: countriesLoading,
		isError: countriesHasError,
		error: countriesError,
		data: countries,
	} = useQuery<CountryData>({
		queryKey: ["countries", keyword],
		queryFn: () => getCountries(keyword),
		// enabled: keyword.length > 0 ? true : false,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	// const deleteCountryMutation = useMutation<
	// 	MutationResponse,
	// 	Error,
	// 	{ countryId: string }
	// >({
	// 	mutationFn: ({ countryId }) => deleteCountry({ countryId }),
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: ["users"] });
	// 		toast({
	// 			variant: "default",
	// 			description: "L'opération a réussi",
	// 		});
	// 	},
	// 	onError: (error: Error) => {
	// 		console.error("Error", error);
	// 		toast({
	// 			variant: "destructive",
	// 			description: "L'opération n'a pas réussi",
	// 		});
	// 	},
	// });

	// const handleDeleteCountry = async (data: { countryId: string }) => {
	// 	deleteCountryMutation.mutate(data);
	// };

	if (countriesHasError) console.log("error", countriesError);

	const countriesColumns: ColumnDef<Country>[] = [
		{
			accessorKey: "name",
			header: "Nom",
		},
		{
			accessorKey: "codePhoneNumber",
			header: "Code",
		},
		{
			accessorKey: "status",
			header: "Statut",
			cell: ({ row }) => {
				return <Badge variant='outline'>{row.original.status}</Badge>;
			},
		},
		{
			accessorKey: "createdAt",
			header: "Date",
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
				const country = row.original;

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
										<Button variant='ghost'>Modifier Pays</Button>
									</DialogTrigger>
								</DropdownMenuItem>
								{/* <DropdownMenuItem>
									<Button
										disabled={blockUserMutation.isPending}
										variant='ghost'
										onClick={() =>
											console.log("user", user, "action:", {
												userId: user?.id,
												status:
													user?.isActive === true
														? false
														: true,
											})
											handleBlockUser({
												userId: country?.id,
												status:
													country?.isActive === true
														? false
														: true,
											})
											alert("Desactivation")
										}
									>
										{blockUserMutation.isPending && (
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									)}
										{country.status === "ACTIVE" ? "Désactiver" : "Activer"}
									</Button>
								</DropdownMenuItem> */}
								{/* <DropdownMenuItem>
									<Button
										disabled={deleteCountryMutation.isPending}
										variant='ghost'
										onClick={() => {
											console.log("countryId", country.id);
											handleDeleteCountry({
												countryId: country.id,
											});
											alert("Suppression");
										}}
									>
										{deleteCountryMutation.isPending && (
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										)}
										Effacer Pays
									</Button>
								</DropdownMenuItem> */}
							</DropdownMenuContent>
						</DropdownMenu>
						<UpdateCountryForm
							// boutiqueId={user?.id}
							countryId={country.id}
						/>
					</Dialog>
				);
			},
		},
	];

	return (
		<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
			<Tabs defaultValue='countries'>
				<div className='flex items-center'>
					<TabsList className='mr-2'>
						<TabsTrigger value='countries'>Pays</TabsTrigger>
						<TabsTrigger disabled value='provinces'>
							Provinces
						</TabsTrigger>
						{/* <TabsTrigger value='draft' className='hidden sm:flex'>
							Inactifs
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
						{/* <DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' size='sm' className='h-8 gap-1'>
									<ListFilter className='h-3.5 w-3.5' />
									<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
										Filter
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button size='sm' variant='outline' className='h-8 gap-1'>
							<File className='h-3.5 w-3.5' />
							<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
								Export
							</span>
						</Button> */}

						<Popover>
							<PopoverTrigger asChild>
								<Button size='sm' className='h-8 gap-1'>
									<PlusCircle className='h-3.5 w-3.5' />
									<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
										Ajouter Pays
									</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-80'>
								<div className='grid gap-2'>
									<div className='space-y-2'>
										<h4 className='font-medium leading-none'>Ajouter</h4>
										<p className='text-sm text-muted-foreground'>
											Ajouter un nouveau Pays au système.
										</p>
									</div>
									<div className='grid gap-2'>
										<AddCountryForm />
									</div>
								</div>
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger asChild>
								<Button size='sm' className='h-8 gap-1'>
									<PlusCircle className='h-3.5 w-3.5' />
									<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
										Ajouter Province
									</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-80'>
								<div className='grid gap-2'>
									<div className='space-y-2'>
										<h4 className='font-medium leading-none'>Ajouter</h4>
										<p className='text-sm text-muted-foreground'>
											Ajouter une nouvelle province au système.
										</p>
									</div>
									<div className='grid gap-2'>
										<AddProvinceForm />
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<TabsContent value='countries'>
					<Card x-chunk='dashboard-06-chunk-0'>
						<CardHeader>
							<CardTitle>Pays</CardTitle>
							<CardDescription>Gérez les differents Pays.</CardDescription>
						</CardHeader>
						<CardContent>
							{countriesLoading && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							{countriesHasError && <div>Une erreur est survenue</div>}
							{!countriesHasError && countries && (
								<DataTable
									columns={countriesColumns}
									data={countries.data.items}
								/>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
