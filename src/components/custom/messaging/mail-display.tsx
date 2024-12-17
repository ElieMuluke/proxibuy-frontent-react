import { Loader, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Separator } from "@components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@services/messaging";
import { WriteMessageForm } from "@components/custom/form/common/WriteMessageForm";
import { getUserSession } from "@lib/cookies";
import { useEffect, useState } from "react";

// interface MailDisplayProps {
// 	mails: Mail[] | null;
// 	selectedMail: {Mail["id"]} | null;
// }

export function MailDisplay({ mails, selectedMail }: any) {
	// console.log("selected mail", selectedMail);
	const {
		isLoading: messagesLoading,
		isError: messagesHasError,
		error: messagesError,
		data: messages,
	} = useQuery({
		queryKey: ["messages", selectedMail?.id],
		queryFn: () => getMessages(selectedMail?.id),
		enabled: !!selectedMail,
	});

	if (messagesHasError) console.log("error", messagesError);
	if (messagesLoading) console.log("loading...");
	// console.log("messages", messages);
	// console.log("selectedMail", selectedMail);
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
		<div className='flex flex-col h-full'>
			{selectedMail ? (
				<div className='flex flex-col h-full'>
					{/* Header section */}
					<div className='flex items-center justify-between p-4 h-15'>
						<div className='flex items-center gap-4 text-sm'>
							<Avatar>
								<AvatarImage
									src={
										selectedMail?.firstUserId === currentUserId
											? `${
													selectedMail?.secondUser?.cover ||
													"https://github.com/shadcn.png"
											  }`
											: `${
													selectedMail?.firstUser?.cover ||
													"https://github.com/shadcn.png"
											  }`
									}
								/>
								<AvatarFallback>
									{(selectedMail?.firstUserId === currentUserId
										? `${selectedMail?.secondUser?.fName} ${selectedMail?.secondUser?.lName}`
										: `${selectedMail?.firstUser?.fName} ${selectedMail?.firstUser?.lName}`
									)
										.split(" ")
										.map((chunk: any) => chunk[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className='grid gap-1'>
								<div className='font-semibold'>
									{selectedMail?.firstUserId === currentUserId
										? `${selectedMail?.secondUser?.fName} ${selectedMail?.secondUser?.lName}`
										: `${selectedMail?.firstUser?.fName} ${selectedMail?.firstUser?.lName}`}
								</div>
							</div>
						</div>
					</div>
					<Separator />
					{/* Scrollable messages section */}
					<div className='flex-1 overflow-y-auto p-4 h-60'>
						{messagesLoading && (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						)}
						{messagesHasError && <div>Une erreur est survenue</div>}
						{messages && messages.data.items.length > 0 ? (
							[...messages.data.items].reverse().map((chat: any) => {
								const time = new Date(chat.createdAt).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								});

								return chat.senderUserId === currentUserId ? (
									<div
										key={chat.id}
										className='flex gap-4 p-2 mb-2 ml-auto justify-end items-center max-w-lg'
									>
										<div className='flex items-end'>
											<div className='flex flex-row items-center gap-2'>
												<div className='text-xs text-gray-500 mt-1'>{time}</div>
												<div className='bg-[#ffd2eb] p-4 rounded-md shadow-md'>
													<div className='text-sm text-gray-800'>
														{chat.text}
													</div>
												</div>
											</div>
										</div>
										<Avatar>
											<AvatarFallback>
												{(selectedMail?.firstUser?.id === currentUserId
													? `${selectedMail?.firstUser?.fName} ${selectedMail?.firstUser?.lName}`
													: `${selectedMail?.secondUser?.fName} ${selectedMail?.secondUser?.lName}`
												)
													.split(" ")
													.map((chunk: any) => chunk[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
									</div>
								) : (
									<div
										key={chat.id}
										className='flex gap-4 p-2 mb-2 mr-auto items-center max-w-lg'
									>
										<Avatar>
											<AvatarFallback>
												{(selectedMail?.firstUserId !== currentUserId
													? `${selectedMail?.secondUser?.fName} ${selectedMail?.secondUser?.lName}`
													: `${selectedMail?.firstUser?.fName} ${selectedMail?.firstUser?.lName}`
												)
													.split(" ")
													.map((chunk: any) => chunk[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className='flex flex-row items-center gap-2'>
											<div className='bg-[#fbb6ce] p-4 rounded-md shadow-md'>
												<div className='text-sm text-gray-800'>{chat.text}</div>
											</div>
											<div className='text-xs text-gray-500 mt-1'>{time}</div>
										</div>
									</div>
								);
							})
						) : (
							<div className='p-8 text-center text-foreground'>
								No message selected...
							</div>
						)}
					</div>
					<Separator className='mt-auto' />
					{/* Footer section */}
					<div className='p-4 h-25'>
						{messages &&
							messages.data.items.length > 0 &&
							currentUserId !== null && (
								<WriteMessageForm
									secondUserId={
										selectedMail?.secondUser?.id !== currentUserId
											? selectedMail?.secondUser?.id
											: selectedMail?.firstUser?.id
									}
									chatId={selectedMail?.id}
								/>
							)}
					</div>
				</div>
			) : (
				<div className='p-8 text-center text-foreground'>
					No message selected
				</div>
			)}
		</div>
	);
}
