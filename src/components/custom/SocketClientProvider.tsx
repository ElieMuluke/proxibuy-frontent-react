"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { socketApiUrl } from "@services/constants";
import { getAccessToken } from "@lib/cookies";

const SocketContext = createContext<Socket<
	DefaultEventsMap,
	DefaultEventsMap
> | null>(null);

export const useSocket = () => {
	return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
		null
	);

	function onConnect() {
		console.log("Connected to the server");
	}

	function onDisconnect(reason: any) {
		console.warn("Disconnected from the server:", reason);
	}

	useEffect(() => {
		// Initialize socket connection
		const accessToken = async () => await getAccessToken();
		console.log("test", accessToken);
		socketRef.current = io(socketApiUrl, {
			extraHeaders: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		socketRef.current.on("connect", onConnect);
		socketRef.current.on("connect_error", (error) => {
			console.error("Connection error:", error);
		});
		socketRef.current.on("disconnect", (reason) => onDisconnect(reason));

		// Clean up the connection when the component unmounts
		return () => {
			socketRef.current?.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={socketRef.current}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
