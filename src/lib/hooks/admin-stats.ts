"use client";

import { useQuery } from "@tanstack/react-query";
import { getCountsByMonth } from "../../services/adminStats";

export function useCountsByMonth() {
	return useQuery({
		queryKey: ["adminCountsByMonth"],
		queryFn: getCountsByMonth,
	});
}
