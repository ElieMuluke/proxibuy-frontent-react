"use client";
import { Button } from "@components/ui/button";
import {
	DialogClose,
	DialogFooter,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { sendNewMessage } from "@services/messaging";
import { Loader, Loader2 } from "lucide-react";
import { getUsers } from "@services/user";

const formSchema = z.object({
	sendAs: z.string({ message: "Veuillez choisir un envoyeur" }),
	message: z.string().min(1, { message: "Message vide" }),
});

interface Users {
	id: string;
	fName: string;
	lName: string;
	image: string;
	isActive: boolean;
	status: string;
	role: string;
	createdAt: string;
}

interface UsersData {
	data: {
		items: Users[];
	};
}

interface SendMesssageFormProps extends React.HTMLAttributes<HTMLDivElement> {
	// boutiqueId: string;
	ownerId: string;
}

export function MesssageForm({
	// boutiqueId,
	ownerId,
	...props
}: SendMesssageFormProps) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	const {
		isLoading: rootUsersLoading,
		isError: rootUsersHasError,
		error: rootUsersError,
		data: rootUsers,
	} = useQuery<UsersData>({
		queryKey: ["users"],
		queryFn: () => getUsers({ userType: "ROOT" }),
		// enabled: keyword.length > 0 ? true : false,
	});

	const mutation = useMutation({
		mutationFn: sendNewMessage,
		onSuccess: () => {
			toast({ variant: "default", title: "Message envoyé" });
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
		// 	senderUserId: values.sendAs ? values.sendAs : "",
		// 	receiverUserId: ownerId,
		// 	text: values.message,
		// });
		mutation.mutate({
			senderUserId: values.sendAs ? values.sendAs : "",
			receiverUserId: ownerId,
			text: values.message,
		});

		form.reset();
	}
	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>Ecrivez votre message</DialogTitle>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<DialogDescription>
						<FormField
							control={form.control}
							name='sendAs'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selectionne l'utilisateur sendeur " />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{rootUsersLoading && (
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											)}
											{rootUsersHasError && <div>Une erreur est survenue</div>}
											{!rootUsersHasError && rootUsers && (
												<>
													{rootUsers.data.items
														// .filter((user: any) => user.role === "ADMIN")
														.map((user: any) => (
															<SelectItem key={user.id} value={user.id}>
																{user.fName} {user.lName}
															</SelectItem>
														))}
												</>
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message:</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Ecrivez votre message ici !'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</DialogDescription>
					<DialogFooter>
						{/* <DialogClose asChild> */}
						<Button type='submit' disabled={mutation.isPending}>
							{mutation.isPending && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							Envoyer message
						</Button>
						{/* </DialogClose> */}
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}
