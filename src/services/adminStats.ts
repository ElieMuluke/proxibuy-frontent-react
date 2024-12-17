import { getAccessToken } from "../lib/cookies";
import { apiUrl } from "./constants";
import axios from "axios";

export async function getAdminCount() {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }

	const response = await axios(`${apiUrl}/admin/count`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
	});

	return await response.data;
}

export async function getCountsByMonth() {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }

	const response = await axios(`${apiUrl}/admin/countsByMonth`, {
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
		throw new Error("Failed to fetch counts by month");
	}

	return await response.data;
}

export async function getActiveBoutiquesCount() {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }

	const url = `${apiUrl}/stores?isActive=true&count=1`;

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

	const result = await response.data;

	if (result.statusCode !== 200) {
		const errorData = await result.data;
		throw new Error(errorData.message || "Failed to fetch boutiques");
	}

	return result;
}
