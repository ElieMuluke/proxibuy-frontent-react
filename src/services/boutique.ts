import axios from "axios";
import {
	getAccessToken,
	getUserSession,
	getOrganizations,
} from "../lib/cookies";
import { apiUrl } from "./constants";

export async function createBoutique({
	// ownerId,
	// organizationId,
	image,
	name,
	description,
	// altitude,
	longitude,
	latitude,
	address_countryId,
	address_provinceId,
	sponsorshipCode,
	// address_provinceId,
	// address_cityId,
	// address_quarterId,
	// address_quarter,
	// addresse_rue,
	// email,
	// phone,
	isActive,
	// rccm,
	// idNat
	storeCategories,
}: {
	// ownerId: string;
	// organizationId: string;
	image: string;
	name: string;
	description: string;
	// altitude: number;
	longitude: number;
	latitude: number;
	address_countryId: string;
	address_provinceId?: string;
	address?: string;
	sponsorshipCode?: string;
	// address_provinceId: string;
	// address_cityId: string;
	// address_quarterId: string;
	// address_quarter: string;
	// addresse_rue: string;
	// email: string;
	// phone: string;
	isActive: boolean;
	// rccm: string;
	// idNat: string;
	storeCategories: string[];
}) {
	try {
		const accessToken = await getAccessToken();
		const session = JSON.parse((await getUserSession()) || "{}");
		const organization = JSON.parse((await getOrganizations()) || "{}");

		if (Object.keys(session).length === 0) {
			throw new Error("Session is empty");
		}

		const ownerId = session.id;
		const organizationId = organization[0].id;

		// if (!accessToken) {
		// 	throw new Error("We couldn't get the user's token");
		// }

		const response = await axios(`${apiUrl}/stores`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			validateStatus: function (status) {
				return (status >= 200 && status < 300) || status === 401;
			},
			data: JSON.stringify({
				ownerId,
				organizationId,
				image,
				name,
				description,
				// altitude,
				longitude,
				latitude,
				address_countryId,
				// quartier,
				// address,
				address_provinceId,
				sponsorshipCode,
				// address_cityId,
				// address_quarterId,
				// address_quarter,
				// addresse_rue,
				// email,
				// phone,
				isActive,
				// rccm,
				// idNat
				storeCategories,
				status: "ACTIVE",
			}),
		});

		return await response.data;
	} catch (e) {
		console.error(e);
		return {
			statusCode: 500,
			message: ["An error occured! Please try again later"],
		};
	}
}

export async function getBoutiqueById({ storeId }: { storeId: string }) {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }
	const response = await axios(`${apiUrl}/stores/${storeId}`, {
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

export async function getBoutiques({
	keyword,
	owner,
}: {
	keyword?: string;
	owner?: boolean;
}) {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }

	const session = JSON.parse((await getUserSession()) || "{}");
	if (Object.keys(session).length === 0) {
		throw new Error("Session is empty");
	}

	const ownerId = session.id;
	const url = keyword
		? owner
			? `${apiUrl}/stores?keyword=${keyword}&ownerId=${ownerId}`
			: `${apiUrl}/stores?keyword=${keyword}`
		: owner
		? `${apiUrl}/stores?ownerId=${ownerId}`
		: `${apiUrl}/stores`;

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

export async function updateBoutique(storeId: string, status: boolean) {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }
	const response = await axios(`${apiUrl}/stores/${storeId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({ isActive: status }),
	});

	return await response.data;
}

export async function activer_desactiver_Boutique(
	storeId: string,
	status: boolean
) {
	const accessToken = await getAccessToken();

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }

	const response = await axios(`${apiUrl}/stores/admin/${storeId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			isActive: status,
		}),
	});

	const result = await response.data;

	if (result.statusCode !== 200) {
		const errorData = await result.data;
		throw new Error(errorData.message || "Failed to update boutique status");
	}

	return result.data;
}

export async function subscribeToStore(storeId: string) {
	const accessToken = await getAccessToken();
	const session = JSON.parse((await getUserSession()) || "{}");

	if (Object.keys(session).length === 0) {
		throw new Error("Session is empty");
	}

	const currentUserId = session.id;

	// if (!accessToken) {
	// 	throw new Error("We couldn't get the user's token");
	// }

	const response = await axios(`${apiUrl}/subscribers-store`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			storeId,
			subscriberUserId: currentUserId,
			status: "ACTIVE",
		}),
	});

	const result = await response.data;

	if (result.statusCode !== 200) {
		const errorData = await result.data;
		throw new Error(errorData.message || "Failed to update boutique status");
	}

	return result.data;
}
