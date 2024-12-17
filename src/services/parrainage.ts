import axios from "axios";
import { getAccessToken } from "../lib/cookies";
import { apiUrl } from "./constants";

export async function getParrains(keyword?: string) {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }

	const url = keyword
		? `${apiUrl}/admin/parentUser-stores?keyword=${encodeURIComponent(keyword)}`
		: `${apiUrl}/admin/parentUser-stores`;

	const response = await axios(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
	});

	if (response.data.statusCode !== 200) {
		const errorData = await response.data;
		throw new Error(errorData.message || "Failed to fetch parrains");
	}

	return response.data;
}
