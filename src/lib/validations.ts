import { z } from 'zod';

// Esquemas de validação de formulários usando Zod
export const userSchema = z.object({
  name: z.string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "O nome deve ter menos de 50 caracteres" }),
  email: z.string()
    .email({ message: "Por favor, insira um endereço de email válido" }),
  phone: z.string()
    .min(10, { message: "O número de telefone deve ter pelo menos 10 caracteres" })
    .regex(/^[\d\s\-+()]+$/, { message: "Por favor, insira um número de telefone válido" }),
  website: z.string()
    .url({ message: "Por favor, insira uma URL válida" })
    .optional()
    .or(z.literal('')),
  company: z.object({
    name: z.string()
      .min(1, { message: "O nome da empresa é obrigatório" })
      .max(100, { message: "O nome da empresa deve ter menos de 100 caracteres" }),
  }),
});

export const postSchema = z.object({
  title: z.string()
    .min(5, { message: "O título deve ter pelo menos 5 caracteres" })
    .max(100, { message: "O título deve ter menos de 100 caracteres" }),
  body: z.string()
    .min(10, { message: "O conteúdo deve ter pelo menos 10 caracteres" })
    .max(1000, { message: "O conteúdo deve ter menos de 1000 caracteres" }),
  userId: z.number()
    .min(1, { message: "Por favor, selecione um usuário" }),
});

export const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string()
    .email({ message: "Por favor, insira um endereço de email válido" }),
  subject: z.string()
    .min(5, { message: "O assunto deve ter pelo menos 5 caracteres" }),
  message: z.string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
    .max(500, { message: "A mensagem deve ter menos de 500 caracteres" }),
});

export const loginSchema = z.object({
  email: z.string()
    .email({ message: "Por favor, insira um endereço de email válido" }),
  password: z.string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z.string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string()
    .email({ message: "Por favor, insira um endereço de email válido" }),
  password: z.string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número"
    }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean()
    .refine(val => val === true, { message: "Você deve aceitar os termos e condições" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Exportação de tipos
export type UserFormData = z.infer<typeof userSchema>;
export type PostFormData = z.infer<typeof postSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;