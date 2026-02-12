import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(['user', 'admin']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, { message: "Refresh token is required" }),
});