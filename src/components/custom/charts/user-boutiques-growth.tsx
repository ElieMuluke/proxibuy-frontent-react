"use client";
import { useCountsByMonth } from "@lib/hooks/admin-stats";
import { calculateTotals, formatCounts } from "@lib/utils";
import { Loader, Loader2 } from "lucide-react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	PieChart,
	Pie,
} from "recharts";
const data = [
	{
		name: "Jan.",
		userBase: 500,
		boutiqueGrowth: 20,
	},
	{
		name: "Fev.",
		userBase: 600,
		boutiqueGrowth: 35,
	},
	{
		name: "Mars",
		userBase: 800,
		boutiqueGrowth: 45,
	},
	{
		name: "Avril",
		userBase: 900,
		boutiqueGrowth: 65,
	},
	{
		name: "Mai",
		userBase: 1000,
		boutiqueGrowth: 45,
	},
	{
		name: "Juin",
		userBase: 1100,
		boutiqueGrowth: 80,
	},
	{
		name: "Juill.",
		userBase: 1200,
		boutiqueGrowth: 95,
	},
	{
		name: "Août",
		userBase: 1300,
		boutiqueGrowth: 100,
	},
	{
		name: "Sept.",
		userBase: 1400,
		boutiqueGrowth: 105,
	},
	{
		name: "Oct.",
		userBase: 1500,
		boutiqueGrowth: 120,
	},
	{
		name: "Nov.",
		userBase: 1600,
		boutiqueGrowth: 130,
	},
	{
		name: "Dec.",
		userBase: 1700,
		boutiqueGrowth: 150,
	},
];

// const { totalUsers, totalBoutiques } = calculateTotals(data);

// const pieChartData = [
// 	{ name: "User Base", value: totalUsers, fill: "#8884d8" },
// 	{ name: "Boutique Growth", value: totalBoutiques, fill: "#ff7300" },
// ];

export function UserGrowthChart() {
	const { data, error, isLoading } = useCountsByMonth();

	if (isLoading) return <Loader2 className='mr-2 h-4 w-4 animate-spin' />;
	if (error) return <div>Error: {error.message}</div>;

	const userCounts = data?.data?.item?.userCounts || [];
	const formattedUserCount = formatCounts(userCounts);
	return (
		<LineChart
			width={600}
			height={300}
			data={formattedUserCount}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Line
				type='monotone'
				name='Utilisateurs'
				dataKey='nbItems'
				stroke='#8884d8'
			/>
			<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
			{/* <Line type='monotone' dataKey='boutiqueGrowth' stroke='#ff7300' />
			<CartesianGrid stroke='#ccc' strokeDasharray='5 5' /> */}
			<XAxis dataKey='month' />
			<YAxis />
			<Legend />
			<Tooltip />
		</LineChart>
	);
}
export function BoutiqueGrowthChart() {
	const { data, error, isLoading } = useCountsByMonth();

	if (isLoading) return <Loader2 className='mr-2 h-4 w-4 animate-spin' />;
	if (error) return <div>Error: {error.message}</div>;

	const storeCounts = data?.data?.item?.storeCounts || [];
	const formattedStoreCount = formatCounts(storeCounts);
	return (
		<LineChart
			width={600}
			height={300}
			data={formattedStoreCount}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Line
				type='monotone'
				name='Boutiques'
				dataKey='nbItems'
				stroke='#ff7300'
			/>
			<CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
			<XAxis dataKey='month' />
			<YAxis />
			<Legend />
			<Tooltip />
		</LineChart>
	);
}

export function UsersBoutiquePieChart() {
	const { data, error, isLoading } = useCountsByMonth();

	if (isLoading) return <Loader2 className='mr-2 h-4 w-4 animate-spin' />;
	if (error) return <div>Error: {error.message}</div>;

	const userCounts = data?.data?.item?.userCounts || [];
	const storeCounts = data?.data?.item?.storeCounts || [];

	const { totalUsers, totalBoutiques } = calculateTotals({
		userCounts,
		storeCounts,
	});

	const pieChartData = [
		{ name: "Utilisateurs", value: totalUsers, fill: "#8884d8" },
		{ name: "Boutiques", value: totalBoutiques, fill: "#ff7300" },
	];
	return (
		<PieChart width={300} height={300} className='mx-auto'>
			<Pie
				data={pieChartData}
				dataKey='value'
				nameKey='name'
				cx='50%'
				cy='50%'
				outerRadius={80}
				fill='fill'
				label
			/>
			<Legend />
		</PieChart>
	);
}
