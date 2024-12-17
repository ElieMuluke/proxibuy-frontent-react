import axios from "axios";
import { getAccessToken, getUserSession } from "../lib/cookies";
import { apiUrl } from "./constants";

export type addProductSchema = {
	ownerId: string;
	storeId: string;
	name: string;
	mainImage: string;
	images: string[];
	description: string;
	moneyCurrencyId: string;
	typeRentalPrice: string;
	isAvailable: boolean;
	forSale: boolean;
	price: number;
	lastPrice: number;
	currentStock: number;
	categoryProductId: string; // Uncommented to match payload
	// Uncommented or removed fields that are missing in the payload
	// address_countryId: string;
	// address_provinceId: string;
	// address_cityId: string;
	// address_quarterId: string;
	// latitude: number;
	// longitude: number;
	// altitude: number;
	status: string;
};

export async function addProduct(data: addProductSchema) {
	const accessToken = await getAccessToken();
	const session = JSON.parse((await getUserSession()) || "{}");
	const userId = session.id;

	// console.log("addProduct", data);
	const response = await axios(`${apiUrl}/products`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			...data,
			// ownerId: userId,
		}),
	});

	return await response.data;
}

export async function getProducts({
	keyword,
	categoryProductId,
}: {
	keyword: string;
	categoryProductId: string;
}) {
	const accessToken = await getAccessToken();
	let url = `${apiUrl}/products`;

	const params: string[] = [];

	// Add keyword to URL params if present
	if (keyword && keyword.trim() !== "") {
		params.push(`keyword=${encodeURIComponent(keyword)}`);
	}

	// Add categoryProductId to URL params if present
	if (categoryProductId && categoryProductId.trim() !== "") {
		params.push(`categoryProductId=${encodeURIComponent(categoryProductId)}`);
	}

	// Append params to the URL if any exist
	if (params.length > 0) {
		url += `?${params.join("&")}`;
	}

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

	return await response.data;
}

export async function getProductById({ productId }: { productId: string }) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/products/${productId}`, {
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

export async function getProductsByStoreId(storeId: string, keyword?: string) {
	const accessToken = await getAccessToken();

	// console.log({ accessToken });
	// console.log("storeId: ", storeId);

	const url =
		keyword && keyword.length > 0
			? `${apiUrl}/products?storeId=${storeId}&keyword=${keyword}`
			: `${apiUrl}/products?storeId=${storeId}`;
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

	return await response.data;
}

export async function updateProductById({
	productId,
	name,
	mainImage,
	images,
	description,
	isAvailable,
	price,
	currentStock,
	categoryProductId,
	address_countryId,
}: {
	productId: string;
	name: string;
	mainImage: string;
	images: string;
	description: string;
	isAvailable: boolean;
	price: number;
	currentStock: number;
	categoryProductId: string;
	address_countryId: string;
}) {
	const accessToken = await getAccessToken();

	// console.log({ accessToken });

	const response = await axios(`${apiUrl}/products/${productId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			name,
			mainImage,
			images,
			description,
			isAvailable,
			price,
			currentStock,
			categoryProductId,
			address_countryId,
		}),
	});

	return await response.data;
}

export async function deleteProductById(productId: string) {
	const accessToken = await getAccessToken();

	// console.log({ accessToken });

	const response = await axios(`${apiUrl}/products/${productId}`, {
		method: "DELETE",
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
