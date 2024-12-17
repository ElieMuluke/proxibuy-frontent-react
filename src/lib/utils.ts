import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatToUTC(UTCTime: string) {
	const date = new Date(UTCTime);
	const isoDate = date.toISOString();

	return `${isoDate.substring(0, 10)} ${isoDate.substring(11, 19)}`;
}

export function calculateTotals(data: {
	userCounts: {
		month: number;
		nbItems: number;
	}[];
	storeCounts: {
		month: number;
		nbItems: number;
	}[];
}) {
	let totalUsers = 0;
	let totalBoutiques = 0;

	data.userCounts.forEach((count) => {
		totalUsers += count.nbItems;
	});

	data.storeCounts.forEach((count) => {
		totalBoutiques += count.nbItems;
	});

	return { totalUsers, totalBoutiques };
}

export function getMonthName(monthNumber: number): string {
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	return monthNames[monthNumber - 1] || "Invalid month";
}

export function formatCodeISO(codeISO: string) {
	let formattedCodeISO = codeISO;
	// Check if CodeISO starts with a '+'
	if (!codeISO.startsWith("+")) {
		formattedCodeISO = `+${codeISO}`;
	}

	// Wrap the result in parentheses
	return `(${formattedCodeISO})`;
}

interface UserCount {
	month: number;
	nbItems: number;
}

export function formatCounts(
	data: {
		month: number;
		nbItems: number;
	}[]
): { month: string; nbItems: number }[] {
	return data.map((count) => ({
		month: getMonthName(count.month),
		nbItems: count.nbItems,
	}));
}
