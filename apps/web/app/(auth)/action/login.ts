'use server';

import { authFetch } from '../data-access/auth-fetch';
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

  const result = await authFetch('auth/login', parsed.data);

  if (!result.ok) {
    return {
      status: FORM_STATUS.ERROR,
      message:
        result.error.status === 404
          ? 'ユーザーが存在しません。'
          : 'ログインに失敗しました。',
    };
  }

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'ログインに成功しました。',
  };
}
