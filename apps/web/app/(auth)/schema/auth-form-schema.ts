import { z } from 'zod';

export const authFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: '正しいメールアドレスの形式ではありません。' })
      .min(1, { message: 'メールアドレスは必須です。' }),
    name: z.string().min(1, { message: '名前は必須です。' }),
    password: z
      .string()
      .min(8, { message: 'パスワードは8桁以上である必要があります。' })
      .regex(
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
        'パスワードは半角英数字混合で入力してください',
      ),
  })
  .brand('auth-form-schema');

export type AuthFormSchema = z.infer<typeof authFormSchema>;
