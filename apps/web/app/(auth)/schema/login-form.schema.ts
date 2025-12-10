import { passwordSchema } from '@/app/schema/password.schema';
import { z } from 'zod';

export const loginFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: '正しいメールアドレスの形式ではありません。' })
      .min(1, { message: 'メールアドレスは必須です。' }),
    password: passwordSchema,
  })
  .brand('login-form-schema');

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
