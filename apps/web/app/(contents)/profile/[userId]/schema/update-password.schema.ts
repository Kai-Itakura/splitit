import { passwordSchema } from '@/app/schema/password.schema';
import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    userId: z.string(),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
    oldPassword: passwordSchema,
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: 'パスワードが一致しません。',
      path: ['confirmPassword'],
    },
  )
  .brand('update-password-schema');

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
