import axios from "axios";
import { getAccessToken } from "../lib/cookies";
import { apiUrl } from "./constants";

export async function addCountry({
	altitude,
	longitude,
	latitude,
	name,
	codePhoneNumber,
	status,
}: {
	altitude?: number;
	longitude?: number;
	latitude?: number;
	name: string;
	codePhoneNumber: string;
	status?: string;
}) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/addresses/countries`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			altitude,
			longitude,
			latitude,
			name,
			codePhoneNumber,
			status: status || "ACTIVE",
		}),
	});

	return await response.data;
}

export async function getCountries(keyword?: string) {
	const accessToken = await getAccessToken();

	// console.log({ accessToken });
	const url = keyword
		? `${apiUrl}/addresses/countries?keyword=${keyword}`
		: `${apiUrl}/addresses/countries`;
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

export async function getProvinces(countryId: string) {
	const accessToken = await getAccessToken();

	// console.log({ accessToken });
	const url = `${apiUrl}/addresses/provinces/country/${countryId}`;
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

export async function addProvince({
	altitude,
	longitude,
	latitude,
	name,
	countryId,
	status,
}: {
	altitude?: number;
	longitude?: number;
	latitude?: number;
	name: string;
	countryId: string;
	status?: string;
}) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/addresses/provinces`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			altitude,
			longitude,
			latitude,
			name,
			countryId,
			status: status || "ACTIVE",
		}),
	});

	return await response.data;
}

export async function updateCountry({
	altitude,
	longitude,
	latitude,
	name,
	codePhoneNumber,
	status,
	countryId,
}: {
	altitude?: number;
	longitude?: number;
	latitude?: number;
	name?: string;
	codePhoneNumber?: string;
	status?: string;
	countryId?: string;
}) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/addresses/countries/${countryId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			altitude,
			longitude,
			latitude,
			name,
			codePhoneNumber,
			status: status || "ACTIVE",
		}),
	});

	return await response.data;
}
export async function deleteCountry({ countryId }: { countryId: string }) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/addresses/countries/${countryId}`, {
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

// Currencies
export async function getCurrencies(keyword?: string) {
	const accessToken = await getAccessToken();

	// console.log({ accessToken });
	const url = keyword
		? `${apiUrl}/moneyCurrencies?keyword=${keyword}`
		: `${apiUrl}/moneyCurrencies`;
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
