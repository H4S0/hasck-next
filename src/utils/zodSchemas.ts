import z from "zod";

const UserRole = ['admin', 'user'] as const;

export const RegisterUserSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    emailVerified: z.boolean().default(false),
    role: z.enum(UserRole).default('user')
})