import { apiUrl } from "../services/constants";

export async function signIn(email: string, password: string) {
	const response = await fetch(`${apiUrl}/auth/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: email, password }),
	});

	const signInResult = await response.json();

	if (signInResult.statusCode === 200) {
		const accessToken = signInResult.data.meta.accessToken;
		const user = signInResult.data.item.user;

		document.cookie = `isAuthenticated=true; secure=true; path=/`;

		if (accessToken) {
			document.cookie = `accessToken=${accessToken}; secure=true; path=/`;
		}

		if (user) {
			document.cookie = `session=${JSON.stringify(user)}; secure=true; path=/`;
		}
	}

	return signInResult;
}

export async function signup(
	firstName: string,
	lastName: string,
	email: string,
	password: string
) {
	const response = await fetch(`${apiUrl}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
			fName: firstName,
			lName: lastName,
			typeUser: "USER",
		}),
	});

	return await response.json();
}

export async function activateAccount(otp: string, email: string) {
	const response = await fetch(
		`${apiUrl}/auth/signup/active-account/otp/${email}/${otp}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return await response.json();
}

export async function forgotPassword(email: string) {
	const response = await fetch(`${apiUrl}/auth/forget-password/${email}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return await response.json();
}

export async function verifyOTP(otp: string, email: string) {
	const response = await fetch(
		`${apiUrl}/auth/forget-password/verify-code/${email}/${otp}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return await response.json();
}

export async function resetPassword(
	newPassword: string,
	email: string,
	code: string
) {
	const response = await fetch(
		`${apiUrl}/auth/forget-password/reset-password`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				code,
				newPassword,
			}),
		}
	);

	return await response.json();
}

function getAccessToken() {
	const cookies = document.cookie.split(";");
	const accessTokenCookie = cookies.find((cookie) =>
		cookie.trim().startsWith("accessToken=")
	);
	return accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
}

function getUserSession() {
	const cookies = document.cookie.split(";");
	const sessionCookie = cookies.find((cookie) =>
		cookie.trim().startsWith("session=")
	);
	return sessionCookie ? sessionCookie.split("=")[1] : null;
}

export async function signOut() {
	const accessToken = getAccessToken();

	if (!accessToken) {
		return {
			message: ["An error occured! Please try again later"],
		};
	}

	const response = await fetch(`${apiUrl}/auth/signout`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	document.cookie =
		"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie =
		"isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie =
		"organizations=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

	return await response.json();
}

export async function updateCurrentSession() {
	const accessToken = getAccessToken();
	const session = JSON.parse(getUserSession() || "{}");
	const userId = session.id;

	const response = await fetch(`${apiUrl}/users/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const userResult = await response.json();

	if (userResult.statusCode === 200) {
		const user = userResult.data.item;
		document.cookie = `isAuthenticated=true; path=/`;

		if (accessToken) {
			document.cookie = `accessToken=${accessToken}; secure=true; path=/`;
		}

		if (user) {
			document.cookie = `session=${JSON.stringify(user)}; path=/`;
		}
	}
	return userResult;
}
