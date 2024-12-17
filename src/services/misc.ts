import axios from "axios";
import { getAccessToken } from "../lib/cookies";
import { apiUrl } from "./constants";

enum RessourceType {
	PRODUCT_IMAGE = "IMAGE::PRODUCT IMAGE",
	STORE_IMAGE = "IMAGE::STORE IMAGE",
	USER_PROFILE_IMAGE = "IMAGE::USER PROFILE IMAGE",
	PRODUCT_TECHINICAL_BOOK = "FILE::PRODUCT TECHINICAL BOOK",
}

export async function uploadStoreImage({
	image,
}: {
	image: File | null | undefined;
}) {
	const accessToken = await getAccessToken();

	const formData = new FormData();
	formData.append("file", image as File);
	formData.append("resourceType", RessourceType.STORE_IMAGE);

	const response = await axios(`${apiUrl}/files/upload/file`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: formData,
	});

	return await response.data;
}

export async function uploadUserProfile({
	image,
}: {
	image: File | null | undefined;
}) {
	const accessToken = await getAccessToken();

	const formData = new FormData();
	formData.append("file", image as File);
	formData.append("resourceType", RessourceType.USER_PROFILE_IMAGE);

	const response = await axios(`${apiUrl}/files/upload/file`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: formData,
	});

	return await response.data;
}

export async function uploadProductImage({ image }: { image: File | null }) {
	const accessToken = await getAccessToken();
	// console.log("resource type", RessourceType.PRODUCT_IMAGE);

	const formData = new FormData();
	formData.append("file", image as File);
	formData.append("resourceType", RessourceType.PRODUCT_IMAGE);

	const response = await axios(`${apiUrl}/files/upload/file`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: formData,
	});

	return await response.data;
}
