"use client";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { cn } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { Mail } from "@app/(utilisateur)/app/messaging/data";
import { useMail } from "@app/(utilisateur)/app/messaging/use-mail";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChats } from "@services/messaging";
import { Loader, Loader2 } from "lucide-react";
import { getUserSession } from "@lib/cookies";
import { useEffect, useState } from "react";

interface MailListProps {
	items: Mail[];
	setMail: (id: Mail["id"]) => void;
	selectedMail: Mail["id"] | null;
}

export function MailList({ items, setMail, selectedMail }: MailListProps) {
	const {
		isLoading: chatsLoading,
		isError: chatsHasError,
		error: chatsError,
		data: chats,
	} = useQuery({
		queryKey: ["chats"],
		queryFn: getChats,
	});

	if (chatsHasError) console.log("error", chatsError);
	if (chatsLoading) console.log("loading...");
	// console.log("chats", chats);

	const [currentUserId, setCurrentUserId] = useState("");

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const user = await getUserSession();
			const parsedUser = JSON.parse(user || "{}");
			// console.log("currentUser", parsedUser);
			setCurrentUserId(parsedUser.id);
		};

		fetchCurrentUser();
	}, []);
	return (
		<ScrollArea className='h-screen'>
			<div className='flex flex-col gap-2 p-4 pt-0'>
				{chatsLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
				{chatsHasError && <div>Une erreur est survenue</div>}
				{chats && chats.data.items.length > 0 ? (
					chats.data.items.map((chat: any) => (
						<button
							key={chat.id}
							className={cn(
								"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
								selectedMail === chat.id && "bg-muted"
							)}
							onClick={() => {
								// console.log("mail", chat.id);
								setMail(chat);
							}}
						>
							<div className='flex w-full flex-col gap-1'>
								<div className='flex items-center'>
									<div className='flex items-center gap-2'>
										<div className='font-semibold'>
											{chat.firstUserId === currentUserId
												? `${chat.secondUser.fName} ${chat.secondUser.lName}`
												: `${chat.firstUser.fName} ${chat.firstUser.lName}`}
										</div>
										{/* {!item.read && (
										<span className='flex h-2 w-2 rounded-full bg-[#F6208F]' />
									)} */}
									</div>
									<div
										className={cn(
											"ml-auto text-xs",
											selectedMail === chat.id
												? "text-[#F6208F]"
												: "text-muted-foreground"
										)}
									>
										{formatDistanceToNow(new Date(chat.createdAt), {
											addSuffix: true,
										})}
									</div>
								</div>
							</div>
						</button>
					))
				) : (
					<div>Oops, vous n'avez aucun message !</div>
				)}
			</div>
		</ScrollArea>
	);
}
