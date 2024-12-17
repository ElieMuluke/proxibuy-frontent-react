"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { toast } from "../../../../components/ui/use-toast";

const accountFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(30, {
			message: "Name must not be longer than 30 characters.",
		}),
	email: z.string().email({
		message: "Please enter an email address.",
	}),
	// devise: z.string({
	// 	required_error: "Please select a devise.",
	// }),
	// dob: z.date({
	// 	required_error: "A date of birth is required.",
	// }),
	// language: z.string({
	// 	required_error: "Please select a language.",
	// }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// const devises = [
// 	{ label: "Franc Congolais(RDC)", value: "cdf" },
// 	{ label: "USD", value: "usd" },
// 	{ label: "Euro", value: "euro" },
// 	{ label: "English Pound", value: "pound" },
// ] as const;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
	// name: "Your name",
	// dob: new Date("2023-01-23"),
};

export function AccountForm() {
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	});

	function onSubmit(data: AccountFormValues) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Noms</FormLabel>
							<FormControl>
								<Input placeholder='Vos noms' {...field} />
							</FormControl>
							<FormDescription>
								Ceci est le nom qui sera affiché sur la plateforme.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Addresse email</FormLabel>
							<FormControl>
								<Input placeholder='Votre Email' {...field} disabled />
							</FormControl>
							<FormDescription>
								Ceci est l&apos;adresse email que tu as utilisé pour
								t&apos;inscrire.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <FormField
					control={form.control}
					name='devise'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='mr-4'>Devise</FormLabel>
							<FormControl>
								<select
									className={cn(
										buttonVariants({ variant: "outline" }),
										"w-[200px] appearance-none font-normal"
									)}
									{...field}
								>
									{devises.map((devise, idx) => (
										<option key={idx} value={devise.value}>
											{devise.label}
										</option>
									))}
								</select>
							</FormControl>
							<FormDescription>
								Choisi la devise que tu veux utiliser sur la plateforme.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/> 
				<FormField
					control={form.control}
					name='dob'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Date of birth</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Your date of birth is used to calculate your age.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/> */}
				<Button type='submit'>Mettre à jour votre compte</Button>
			</form>
		</Form>
	);
}
