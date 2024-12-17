"use client";

import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Separator } from "@components/ui/separator";
import { getNotifications } from "@services/notifications";
import { useQuery } from "@tanstack/react-query";
import { Bell, Loader, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface notificationType {
	id: string;
	createdAt: string;
	title: string;
	msg: string;
	iconLink: string;
	link: string;
	typeNotification: string;
	senderUserId: string;
	subscriberUserId: string;
	senderUser: {
		id: string;
		fName: string;
		lName: string;
		status: string;
		cover: string;
	};
	subscriberUser: {
		id: string;
		fName: string;
		lName: string;
		status: string;
		cover: string;
	};
}

export function HeaderNotificationTrail() {
	// const router = useRouter();

	const {
		isLoading: notificationsLoading,
		isError: notificationsHasError,
		error: notificationsError,
		data: notifications,
	} = useQuery({
		queryKey: ["notifications"],
		queryFn: () => getNotifications(),
		// enabled: !!selectedMail,
	});

	// if (!notificationsLoading && !notificationsHasError)
	// 	console.log("notifications", notifications);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='relative'>
					<Button variant='ghost' size='sm'>
						<Bell />
						{/* Counter Badge */}
						{!notificationsLoading && !notificationsHasError && (
							<span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center'>
								{notifications.data.items.length}
							</span>
						)}
						<span className='sr-only'>Voir notifications</span>
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{notificationsLoading && (
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
				)}
				{notificationsHasError && <p>{notificationsError.message}</p>}
				{!notificationsLoading &&
				!notificationsHasError &&
				notifications.length > 0 ? (
					notifications.data.items.map((notification: notificationType) => (
						<div key={notification.id}>
							<DropdownMenuItem
								className='w-[300px] flex justify-between items-center gap-4'
								onClick={() => null}
							>
								{/* Left section for title and message */}
								<div className='flex items-center gap-4'>
									<img src={notification.iconLink} className='w-8 h-8' />
									<div className='flex flex-col'>
										<p className='font-bold text-lg'>{notification.title}</p>
										<p className='text-sm text-gray-700'>{notification.msg}</p>
									</div>
								</div>

								{/* Right section for the time (distance) */}
								<p className='text-xs text-gray-500'>
									{formatDistanceToNow(notification.createdAt)}
								</p>
							</DropdownMenuItem>
							<Separator />
						</div>
					))
				) : (
					<DropdownMenuItem>Aucune notification</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
