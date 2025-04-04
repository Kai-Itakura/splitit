'use server';

import { loginFormSchema } from '../schema/login-form.schema';
import { FORM_STATUS, FormActionState } from './form-state';

export async function login(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const data = Object.fromEntries(formData);
  const parsed = loginFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.message,
    };
  }

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    if (res.status === 404) {
      return {
        status: FORM_STATUS.ERROR,
        message: 'ユーザーが存在しません。',
      };
    } else {
      return {
        status: FORM_STATUS.ERROR,
        message: 'サインインに失敗しました。',
      };
    }
  }

  return { status: FORM_STATUS.SUCCESS, message: 'ログインに成功しました。' };
}
