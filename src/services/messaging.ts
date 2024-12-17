import axios from "axios";
import { getAccessToken, getUserSession } from "../lib/cookies";
import { apiUrl } from "./constants";

export const sendMessage = async (data: {
	receiverUserId: string;
	text: string;
	chatId: string;
}) => {
	const accessToken = await getAccessToken();
	const userSession = JSON.parse((await getUserSession()) || "{}");
	const response = await axios(`${apiUrl}/messages`, {
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
			senderUserId: userSession.id,
			status: "ACTIVE",
			// msgType: "TEXT",
			readStatus: "UNREAD",
		}),
	});

	return await response.data;
};

export const sendNewMessage = async (data: {
	senderUserId: string;
	receiverUserId: string;
	text: string;
}) => {
	const accessToken = await getAccessToken();
	const userSession = JSON.parse((await getUserSession()) || "{}");

	const sender =
		data.senderUserId.length > 0 ||
		data.senderUserId === undefined ||
		data.senderUserId === null
			? data.senderUserId
			: userSession.id;

	// console.log("message", {
	// 	sender,
	// });
	// return;
	const response = await axios(`${apiUrl}/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		validateStatus: function (status) {
			return (status >= 200 && status < 300) || status === 401;
		},
		data: JSON.stringify({
			senderUserId: sender,
			receiverUserId: data.receiverUserId,
			text: data.text,
			readStatus: "UNREAD",
			status: "ACTIVE",
		}),
	});

	return await response.data;
};

export const getChats = async () => {
	const accessToken = await getAccessToken();
	const userSession = JSON.parse((await getUserSession()) || "{}");

	// console.log("userSession", userSession);
	const response = await axios(`${apiUrl}/chats?userId=${userSession.id}`, {
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
		throw new Error("Failed to send message");
	}

	return await response.data;
};

export const getMessages = async (chatId: string) => {
	const accessToken = await getAccessToken();
	const response = await axios(`${apiUrl}/messages?chatId=${chatId}`, {
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
		throw new Error("Failed to send message");
	}

	return await response.data;
};
