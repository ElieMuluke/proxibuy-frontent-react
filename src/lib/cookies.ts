import { expires } from "../services/constants";

const getCookie = (name: string) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const setCookie = (
	name: string,
	value: string,
	options: { expires: Date; secure: boolean }
) => {
	let cookie = `${name}=${value}`;
	if (options.expires) {
		cookie += `; expires=${options.expires.toUTCString()}`;
	}
	if (options.secure) {
		cookie += "; secure";
	}
	document.cookie = cookie;
};

const deleteCookie = (name: string) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export async function getAccessToken() {
	return getCookie("accessToken");
}

export async function getUserSession() {
	return getCookie("session");
}

export async function getOrganizations() {
	return getCookie("organizations");
}

export async function isAuthenticated() {
	return getCookie("isAuthenticated") ?? false;
}

export async function setCookieItem(key: string, value: string) {
	return setCookie(key, value, {
		expires,
		secure: true,
	});
}

export async function deleteCookieItem(key: string) {
	return deleteCookie(key);
}
