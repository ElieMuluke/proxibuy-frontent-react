import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PUBLIC_ROUTES } from "./lib/routes";

export function AuthMiddleware() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const isAuthenticated =
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("isAuthenticated="))
				?.split("=")[1] === "true";

		const isPublicUrl = PUBLIC_ROUTES.find(
			(route) =>
				location.pathname.startsWith(route) || location.pathname === "/"
		);

		if (!isAuthenticated && !isPublicUrl) {
			const returnTo = encodeURIComponent(location.pathname);
			navigate(`/login?returnTo=${returnTo}`);
		}
	}, [location, navigate]);
}

// Usage in your app:
// Wrap your routes with this middleware
// <AuthMiddleware>
//   <YourRoutes />
// </AuthMiddleware>
