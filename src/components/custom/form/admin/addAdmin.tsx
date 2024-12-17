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
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Loader, Loader2 } from "lucide-react";
import { Input } from "@components/ui/input";
import { addAdminUser } from "@services/user";

const formSchema = z.object({
	fName: z.string().min(2, {
		message: "first name must be at least 2 characters.",
	}),
	lName: z.string().min(2, {
		message: "last name must be at least 2 characters.",
	}),
	email: z.string().email({ message: "Invalid email address" }),
	// password: z.string().min(8, {
	// 	message: "Password must be at least 8 characters",
	// }),
});

interface AddAdminFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddAdminForm({ ...props }: AddAdminFormProps) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fName: "",
			lName: "",
			email: "",
			// password: "",
		},
	});

	const mutation = useMutation({
		mutationFn: addAdminUser,
		onSuccess: () => {
			toast({ variant: "default", title: "Admin was created" });
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (error: any) => {
			toast({
				variant: "destructive",
				title: "Error adding the administrator",
				description: error.message,
			});
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// console.log("values", values);
		// console.log("user object value", {
		// 	...values,
		// 	typeUser: "ADMIN",
		// 	password: "1234567890",
		// });
		mutation.mutate({
			...values,
			typeUser: "ADMIN",
			password: "1234567890",
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='grid grid-cols-1 gap-4'>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='fName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Prénom:</FormLabel>
									<FormControl>
										<Input type='text' placeholder='Prénom' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Postnom:</FormLabel>
									<FormControl>
										<Input type='text' placeholder='Postnom' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email:</FormLabel>
									<FormControl>
										<Input type='email' placeholder='Email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* <div>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mot de passe:</FormLabel>
									<FormControl>
										<Input
											type='password'
											defaultValue='1234567890'
											placeholder='Mot de passe'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div> */}
					<div>
						<Button
							type='submit'
							disabled={mutation.isPending}
							className='w-full'
						>
							{mutation.isPending && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							Ajouter Admin
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
