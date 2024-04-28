import { z } from 'zod'

export const RegisterSchema = z.object({
    name: z.string().min(1, "You must enter your name"),
    email: z.string().email('Invalid email address').max(100),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const LoginSchema = z.object({
    email: z.string().email('Invalid email address').max(100),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const emailSchema = z.object({
    email: z.string().email('Invalid email address').max(100),
})

export const passwordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm: z.string().min(8, "Password must be at least 8 characters")
    })
    .refine(data => data.password === data.confirm, {
        message: "Password don't match",
        path: ['confirm']
    })

