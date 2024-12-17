import axios from "axios";
import { apiUrl } from "./constants";
import { getAccessToken } from "../lib/cookies";

export async function addProductCategory({
	userId,
	name,
	description,
	image,
	status,
}: {
	userId: string;
	name: string;
	description: string;
	image: string;
	status: string;
}) {
	const accessToken = await getAccessToken();

	// console.log({ accessToken });

	const response = await axios(`${apiUrl}/categoriesProduct`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			userId,
			name,
			description,
			image,
			status,
		}),
	});

	return await response.data;
}

export async function getProductCategories() {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/categoriesProduct`, {
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
