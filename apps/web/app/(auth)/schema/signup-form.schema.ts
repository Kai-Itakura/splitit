import { passwordSchema } from '@/app/schema/password.schema';
import { z } from 'zod';

export const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: '名前は必須です。' }),
    email: z
      .string()
      .email({ message: '正しいメールアドレスの形式ではありません。' })
      .min(1, { message: 'メールアドレスは必須です。' }),
    password: passwordSchema,
  })
  .brand('signup-form-schema');

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
