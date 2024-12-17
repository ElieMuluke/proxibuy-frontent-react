// hooks/useAuth.ts
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { signOut } from "../../services/auth";

interface UserSession {
	id: string;
	email: string;
	phone: string;
	fName: string;
	lName: string;
	cover: string;
	createdAt: Date;
	updatedAt: Date;
	status: string;
	isActive: boolean;
	role: string;
	chatId: string;
	isConnected: boolean;
	accessToken: string;
	address_countryId: string;
	address_provinceId: string;
	address_cityId: string;
	address_quarterId: string;
	address: string;
	username: string;
}

export default function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userSession, setUserSession] = useState<UserSession | null>(null);

	const logout = async () => {
		Cookies.remove("isAuthenticated");
		Cookies.remove("session");
		setIsAuthenticated(false);
		setUserSession(null);
		await signOut();
	};

	useEffect(() => {
		const auth = Cookies.get("isAuthenticated");
		setIsAuthenticated(auth === "true");

		const session = Cookies.get("session");
		if (session) {
			setUserSession(JSON.parse(session));
			console.log("session", userSession);
		}
	}, []);

	return { isAuthenticated, userSession, logout };
}
