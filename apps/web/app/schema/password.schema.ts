import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'パスワードは8桁以上である必要があります。' })
  .regex(
    /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
    'パスワードは半角英数字混合で入力してください',
  );
