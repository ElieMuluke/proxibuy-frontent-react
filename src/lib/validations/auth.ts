import * as z from "zod";

export const userLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const userRegisterSchema = z.object({
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
});

export const userActivateAccountSchema = z.object({
	otp: z.string().length(6),
});

export const userForgotSchema = z.object({
	email: z.string().email(),
});

export const userVerifySchema = z.object({
	otp: z.string().length(6),
});

export const userResetSchema = z.object({
	newPassword: z.string().min(6),
});
