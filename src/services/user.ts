import axios from "axios";
import { getAccessToken, getUserSession } from "../lib/cookies";
import { apiUrl } from "./constants";

export async function addAdminUser(data: {
	fName: string;
	lName: string;
	email: string;
	password: string;
	typeUser: string;
}) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/auth/create-user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify(data),
	});

	return await response.data;
}
export async function getCurrentUser() {
	const accessToken = await getAccessToken();
	const session = JSON.parse((await getUserSession()) || "{}");
	const userId = session.id;

	const response = await axios(`${apiUrl}/users/${userId}`, {
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
export async function updateCurrentUser(data: any) {
	const accessToken = await getAccessToken();
	const session = JSON.parse((await getUserSession()) || "{}");
	const userId = session.id;

	// console.log("accessToken", accessToken);
	// console.log("data", data);
	const response = await axios(`${apiUrl}/users/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify(data),
	});

	return await response.data;
}

export async function updateUser({
	data,
	userId,
}: {
	data: any;
	userId?: string;
}) {
	const accessToken = await getAccessToken();
	const user_id = userId;

	const response = await axios(`${apiUrl}/users/${user_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify(data),
	});

	return await response.data;
}

export async function getUsers({
	keyword,
	userType,
}: {
	keyword?: string;
	userType?: string;
}) {
	const accessToken = await getAccessToken();

	let url = keyword
		? `${apiUrl}/users?keyword=${encodeURIComponent(keyword)}`
		: `${apiUrl}/users`;
	url =
		userType && keyword
			? `${url}&role=${userType}`
			: userType
			? `${url}?role=${userType}`
			: url;
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

export async function blockUser({
	userId,
	status,
}: {
	userId: string;
	status: boolean;
}) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/users/isActive/${userId}`, {
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

	return await response.data;
}

export async function makeAdmin({
	userId,
	role,
}: {
	userId: string;
	role: string;
}) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/users/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			role,
		}),
	});

	return await response.data;
}

export async function deleteUser(userId: string) {
	const accessToken = await getAccessToken();

	const response = await axios(`${apiUrl}/users/${userId}`, {
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
