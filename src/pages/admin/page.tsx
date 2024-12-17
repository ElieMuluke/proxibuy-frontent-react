import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	UserGrowthChart,
	BoutiqueGrowthChart,
	UsersBoutiquePieChart,
} from "../../components/custom/charts/user-boutiques-growth";
import AdminCount from "../../components/custom/stats/AdminCount";
export default function Dashboard() {
	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2'>
				<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
					<AdminCount />
					<div className='grid gap-1 md:gap-4 lg:grid-cols-6'>
						<Card
							className='col-span-1 md:col-span-3 lg:col-span-3'
							x-chunk='dashboard-01-chunk-4'
						>
							<CardHeader className='flex flex-row items-center'>
								<div className='grid gap-2'>
									<CardTitle>Accru des utilisateurs</CardTitle>
									<CardDescription>
										Statistiques des utilisateurs
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<UserGrowthChart />
							</CardContent>
						</Card>
						<Card
							className='col-span-1 md:col-span-3 lg:col-span-3'
							x-chunk='dashboard-01-chunk-4'
						>
							<CardHeader className='flex flex-row items-center'>
								<div className='grid gap-2'>
									<CardTitle>Accru des boutiques</CardTitle>
									<CardDescription>Statistiques des boutiques</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<BoutiqueGrowthChart />
							</CardContent>
						</Card>
						<Card
							className='col-span-1 md:col-span-2 lg:col-span-2'
							x-chunk='dashboard-01-chunk-5'
						>
							<CardHeader>
								<CardTitle>Utilisateurs and Boutiques</CardTitle>
								<CardDescription>
									Statistiques des utilisateurs et des boutiques
								</CardDescription>
							</CardHeader>
							<CardContent>
								<UsersBoutiquePieChart />
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
