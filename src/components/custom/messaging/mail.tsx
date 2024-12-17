import * as React from "react";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "../../ui/resizable";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { TooltipProvider } from "../../ui/tooltip";
import { MailDisplay } from "../../custom/messaging/mail-display";
import { MailList } from "../../custom/messaging/mail-list";
import { useMail } from "../../../pages/admin/messaging/use-mail";
import { type Mail } from "../../../pages/admin/messaging/data";

interface MailProps {
	accounts: {
		label: string;
		email: string;
		icon: React.ReactNode;
	}[];
	mails: Mail[];
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
}

export function Mail({
	mails,
	defaultLayout = [265, 440, 655],
}: // defaultCollapsed = false,
MailProps) {
	// const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
	const [mail, setMail] = useMail();

	return (
		<TooltipProvider delayDuration={0}>
			<ResizablePanelGroup
				direction='horizontal'
				onLayout={(sizes: number[]) => {
					document.cookie = `react-resizable-panels:layout=${JSON.stringify(
						sizes
					)}`;
				}}
				className='h-full max-h-[800px] items-stretch'
			>
				<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
					<Tabs defaultValue='all'>
						<div className='flex items-center px-4 py-2'>
							<h1 className='text-xl font-bold'>Messages</h1>
							<TabsList className='ml-auto'>
								<TabsTrigger
									value='all'
									className='text-zinc-600 dark:text-zinc-200'
								>
									Tout
								</TabsTrigger>
								{/* <TabsTrigger
									value='unread'
									className='text-zinc-600 dark:text-zinc-200'
								>
									Non lu
								</TabsTrigger> */}
							</TabsList>
						</div>
						<Separator />
						<div className='bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
							{/* <form>
								<div className='relative'>
									<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
									<Input placeholder='Recherche Message' className='pl-8' />
								</div>
							</form> */}
						</div>
						<TabsContent value='all' className='m-0'>
							<MailList items={mails} setMail={setMail} selectedMail={mail} />
						</TabsContent>
						<TabsContent value='unread' className='m-0'>
							<MailList
								items={mails.filter((item) => !item.read)}
								setMail={setMail}
								selectedMail={mail}
							/>
						</TabsContent>
					</Tabs>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={defaultLayout[2]}>
					<MailDisplay mails={mails} selectedMail={mail} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</TooltipProvider>
	);
}
