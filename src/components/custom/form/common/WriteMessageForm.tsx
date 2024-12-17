"use client";
import { Button } from "@components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@components/ui/form";
import { Loader, Loader2, SendHorizontal } from "lucide-react";
import { Textarea } from "@components/ui/textarea";
import { sendMessage } from "@services/messaging";

const formSchema = z.object({
	message: z.string(),
});

interface WriteMessageFormProps extends React.HTMLAttributes<HTMLDivElement> {
	secondUserId: string;
	chatId: string;
}

export function WriteMessageForm({
	secondUserId,
	chatId,
	...props
}: WriteMessageFormProps) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	const mutation = useMutation({
		mutationFn: sendMessage,
		onSuccess: () => {
			// toast({ variant: "default", title: "Message envoyé" });
			queryClient.invalidateQueries({ queryKey: ["messages"] });
		},
		onError: (error: any) => {
			console.log("error:", error);
			toast({
				variant: "destructive",
				title: "Message n'a pas pu être envoyé",
				description: error.message,
			});
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// console.log("user object value", {
		// 	receiverUserId: secondUserId,
		// 	text: values.message,
		// 	chatId,
		// });
		mutation.mutate({
			receiverUserId: secondUserId,
			text: values.message,
			chatId,
		});

		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='flex gap-4 w-full items-end'>
					<div className='flex-grow'>
						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder={`Répondre ...`}
											className='p-4 resize-none border rounded-md shadow-sm focus:ring focus:ring-opacity-50'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex-shrink-0'>
						<Button
							type='submit'
							disabled={mutation.isPending}
							size='sm'
							className='h-full bg-[#F6208F] text-white transition ease-in-out duration-300 flex items-center justify-center p-4 rounded-md shadow-md'
						>
							{mutation.isPending ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<SendHorizontal />
							)}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
