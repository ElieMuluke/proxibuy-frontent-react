"use client";
import { Activity, Users, User, Store, Loader, Loader2 } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAdminCount } from "@services/adminStats";

export default function AdminCount() {
	const {
		isLoading: countLoading,
		isError: countHasError,
		error: countError,
		data: adminCount,
	} = useQuery({
		queryKey: ["stores"],
		queryFn: getAdminCount,
	});

	if (countHasError) {
		console.log("countError", countError);
		return <div>An error occured while fetching the admin counts</div>;
	}

	const count = adminCount?.data?.item;
	return (
		<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
			<Card x-chunk='dashboard-01-chunk-0'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Nombre des utilisateurs actifs
					</CardTitle>
					<Users className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{countLoading ? (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						) : (
							count?.user?.activeUsers
						)}
					</div>
					{/* <p className='text-xs text-muted-foreground'>
							+1000 from last month
						</p> */}
				</CardContent>
			</Card>
			<Card x-chunk='dashboard-01-chunk-0'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Nombre total des utilisateurs
					</CardTitle>
					<Users className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{countLoading ? (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						) : (
							count?.user?.totalUsers
						)}
					</div>
					{/* <p className='text-xs text-muted-foreground'>
							+1000 from last month
						</p> */}
				</CardContent>
			</Card>
			<Card x-chunk='dashboard-01-chunk-3'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Boutiques Actives
					</CardTitle>
					<Activity className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{countLoading ? (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						) : (
							count?.stores?.activeStores || 0
						)}
					</div>
					{/* <p className='text-xs text-muted-foreground'>
							+201 since last 24 hours
						</p> */}
				</CardContent>
			</Card>
			<Card x-chunk='dashboard-01-chunk-1'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Nombre total des boutiques
					</CardTitle>
					<Store className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{countLoading ? (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						) : (
							count?.stores?.totalStores || 0
						)}
					</div>
					{/* <p className='text-xs text-muted-foreground'>
							+500 from last month
						</p> */}
				</CardContent>
			</Card>
			<Card x-chunk='dashboard-01-chunk-2'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Nombre des parrains actifs
					</CardTitle>
					<User className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{countLoading ? (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						) : (
							count?.sponsorship.sponsorship_ACTIVE.length || 0 || 0
						)}
					</div>
					{/* <p className='text-xs text-muted-foreground'>
							+19% from last month
						</p> */}
				</CardContent>
			</Card>
			<Card x-chunk='dashboard-01-chunk-2'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>
						Nombre total des parrains
					</CardTitle>
					<User className='h-4 w-4 text-muted-foreground' />
				</CardHeader>
				<CardContent>
					<div className='text-2xl font-bold'>
						{countLoading ? (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						) : (
							count?.sponsorship.sponsorship_ALL.length || 0
						)}
					</div>
					{/* <p className='text-xs text-muted-foreground'>
							+19% from last month
						</p> */}
				</CardContent>
			</Card>
		</div>
	);
}
