import { z } from 'zod';

export const createExpenseSchema = z
  .object({
    title: z.string().min(1, { message: 'タイトルは必須です。' }),
    amount: z
      .string()
      .min(1, '金額は必須です。')
      .default('')
      .refine((val) => !isNaN(Number(val)), {
        message: '金額は数値で入力してください。',
      })
      .refine((val) => Number(val) > 0, {
        message: '金額は1以上の数値を入力してください。',
      }),
    payerId: z.string().min(1, { message: '立て替えた人を選択してください。' }),
    payeeIds: z
      .array(z.string())
      .min(1, { message: '立て替え対象者を選択してください。' }),
  })
  .brand('create-expense-schema');

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;
