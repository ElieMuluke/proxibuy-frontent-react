import { Loader2, MoreHorizontal, PlusCircle, Search } from "lucide-react";
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
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../components/ui/popover";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blockUser, getUsers, makeAdmin } from "../../../services/user";
import { formatToUTC } from "../../../lib/utils";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import { MesssageForm } from "../../../components/custom/form/admin/message";
import { AddAdminForm } from "../../../components/custom/form/admin/addAdmin";
import { DataTable } from "../../../components/custom/data-tables/data-table";

interface Users {
	id: string;
	fName: string;
	lName: string;
	image: string;
	isActive: boolean;
	status: string;
	role: string;
	sponsorshipCode: string;
	createdAt: string;
}

interface UsersData {
	data: {
		items: Users[];
	};
}

type MutationResponse = {
	success: boolean;
	message: string;
};
export default function Utilisateurs() {
	const [keyword, setKeyword] = useState("");
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const {
		isLoading: usersLoading,
		isError: usersHasError,
		error: usersError,
		data: users,
	} = useQuery<UsersData>({
		queryKey: ["users", keyword],
		queryFn: () => getUsers({ keyword }),
		// enabled: keyword.length > 0 ? true : false,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	const blockUserMutation = useMutation<
		MutationResponse,
		Error,
		{ userId: string; status: boolean }
	>({
		mutationFn: ({ userId, status }) => blockUser({ userId, status }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({
				variant: "default",
				description: "L'opération a réussi",
			});
		},
		onError: (error: Error) => {
			console.error("Error", error);
			toast({
				variant: "destructive",
				description: "L'opération n'a pas réussi",
			});
		},
	});

	const makeAdminMutation = useMutation<
		MutationResponse,
		Error,
		{ userId: string; role: string }
	>({
		mutationFn: ({ userId, role }) => makeAdmin({ userId, role }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast({
				variant: "default",
				description: "L'opération a réussi",
			});
		},
		onError: (error: Error) => {
			console.error("Error", error);
			toast({
				variant: "destructive",
				description: "L'opération n'a pas réussi",
			});
		},
	});

	const handleBlockUser = async (data: { userId: string; status: boolean }) => {
		blockUserMutation.mutate(data);
	};

	const handleChangeRole = async (data: { userId: string; role: string }) => {
		makeAdminMutation.mutate(data);
	};

	if (usersHasError) console.log("error", usersError);

	const adminsColumns: ColumnDef<Users>[] = [
		{
			accessorKey: "image",
			header: "Image",
			cell: ({ row }) => {
				const admin = row.original;
				return (
					<img
						alt='Product image'
						className='aspect-square rounded-md object-cover'
						height='64'
						src={admin.image || "/avatarPlaceholder.png"}
						width='64'
					/>
				);
			},
		},
		{
			accessorKey: "name",
			header: "Nom",
			cell: ({ row }) => {
				const admin = row.original;
				return `${admin.fName} ${admin.lName}`;
			},
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
			accessorKey: "role",
			header: "Role",
		},
		{
			accessorKey: "sponsorshipCode",
			header: "Code Sponsor",
			cell: ({ row }) => {
				return <Badge variant='outline'>{row.original.sponsorshipCode}</Badge>;
			},
		},
		{
			accessorKey: "createdAt",
			header: "Date d'adhésion",
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
				const user = row.original;

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
								{user?.role !== "ADMIN" && (
									<DropdownMenuItem>
										<Button
											disabled={blockUserMutation.isPending}
											variant='ghost'
											onClick={() =>
												// console.log("user", user, "action:", {
												// 	userId: user?.id,
												// 	status:
												// 		user?.role !== "ADMIN"
												// 			? "make admin"
												// 			: "is already admin",
												// })
												handleChangeRole({
													userId: user?.id,
													role: "ADMIN",
												})
											}
										>
											{makeAdminMutation.isPending && (
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											)}
											Faire Admin
										</Button>
									</DropdownMenuItem>
								)}
								{user?.role === "ADMIN" && (
									<DropdownMenuItem>
										<Button
											disabled={blockUserMutation.isPending}
											variant='ghost'
											onClick={() =>
												// console.log("user", user, "action:", {
												// 	userId: user?.id,
												// 	status:
												// 		user?.role !== "ADMIN"
												// 			? "make admin"
												// 			: "is already admin",
												// })
												handleChangeRole({
													userId: user?.id,
													role: "ROOT",
												})
											}
										>
											{makeAdminMutation.isPending && (
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											)}
											Faire Root
										</Button>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem>
									<Button
										disabled={blockUserMutation.isPending}
										variant='ghost'
										onClick={() =>
											// console.log("user", user, "action:", {
											// 	userId: user?.id,
											// 	status:
											// 		user?.isActive === true
											// 			? false
											// 			: true,
											// })
											handleBlockUser({
												userId: user?.id,
												status: user?.isActive === true ? false : true,
											})
										}
									>
										{blockUserMutation.isPending && (
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										)}
										{user?.isActive === true ? "Bloquer" : "Debloquer"}
									</Button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<MesssageForm
							// boutiqueId={user?.id}
							ownerId={user?.id}
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
						<TabsTrigger value='all'>All</TabsTrigger>
						{/* <TabsTrigger value='active'>Actifs</TabsTrigger>
						<TabsTrigger value='draft' className='hidden sm:flex'>
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
										Ajouter Administrateur
									</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-80'>
								<div className='grid gap-2'>
									<div className='space-y-2'>
										<h4 className='font-medium leading-none'>Ajouter</h4>
										<p className='text-sm text-muted-foreground'>
											Ajouter un nouvel administrateur au système.
										</p>
									</div>
									<div className='grid gap-2'>
										<AddAdminForm />
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<TabsContent value='all'>
					<Card x-chunk='dashboard-06-chunk-0'>
						<CardHeader>
							<CardTitle>Administrateurs</CardTitle>
							<CardDescription>
								Gérez les differents administrateurs.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{usersLoading && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							{usersHasError && <div>Une erreur est survenue</div>}
							{!usersHasError &&
								users &&
								(users.data.items && users.data.items.length > 0 ? (
									<DataTable columns={adminsColumns} data={users.data.items} />
								) : (
									<span>
										Il n'y a pas encore d'utilisateur{" "}
										{keyword.length > 0
											? "pour la recherche '" + keyword + "'"
											: "créée !"}
									</span>
								))}
						</CardContent>
						{/* <CardFooter>
							<div className='text-xs text-muted-foreground'>
								Showing <strong>1-10</strong> of <strong>32</strong> products
							</div>
						</CardFooter> */}
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
