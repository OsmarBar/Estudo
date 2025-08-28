import { z } from 'zod';

// Form validation schemas using Zod
export const userSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .regex(/^[\d\s\-\+\(\)]+$/, { message: "Please enter a valid phone number" }),
  website: z.string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal('')),
  company: z.object({
    name: z.string()
      .min(1, { message: "Company name is required" })
      .max(100, { message: "Company name must be less than 100 characters" }),
  }),
});

export const postSchema = z.object({
  title: z.string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  body: z.string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(1000, { message: "Content must be less than 1000 characters" }),
  userId: z.number()
    .min(1, { message: "Please select a user" }),
});

export const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  subject: z.string()
    .min(5, { message: "Subject must be at least 5 characters long" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(500, { message: "Message must be less than 500 characters" }),
});

export const loginSchema = z.object({
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean()
    .refine(val => val === true, { message: "You must accept the terms and conditions" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type exports
export type UserFormData = z.infer<typeof userSchema>;
export type PostFormData = z.infer<typeof postSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;