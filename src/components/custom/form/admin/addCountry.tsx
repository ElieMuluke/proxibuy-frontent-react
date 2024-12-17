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
import { addCountry } from "@services/address";
import { formatCodeISO } from "@lib/utils";

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Le nom est requis",
	}),
	CodeISO: z.string().min(1, {
		message: "Le code ISO est requis",
	}),
});

interface AddCountryFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AddCountryForm({ ...props }: AddCountryFormProps) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			CodeISO: "",
		},
	});

	const mutation = useMutation({
		mutationFn: addCountry,
		onSuccess: () => {
			toast({ variant: "default", title: "country was created" });
			queryClient.invalidateQueries({ queryKey: ["countries"] });
		},
		onError: (error: any) => {
			toast({
				variant: "destructive",
				title: "Error adding the country",
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
			name: values.name,
			codePhoneNumber: formatCodeISO(values.CodeISO),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='grid grid-cols-1 gap-4'>
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom:</FormLabel>
									<FormControl>
										<Input type='text' placeholder='eg. RDC' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='CodeISO'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Code ISO:</FormLabel>
									<FormControl>
										<Input type='text' placeholder='eg. +243' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<Button
							type='submit'
							disabled={mutation.isPending}
							className='w-full'
						>
							{mutation.isPending && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							Ajouter un Pays
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
