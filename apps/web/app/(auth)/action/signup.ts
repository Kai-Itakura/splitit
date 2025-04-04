'use server';

import { signupFormSchema } from '../schema/signup-form.schema';
import { FORM_STATUS, FormActionState } from './form-state';

export async function signup(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const data = Object.fromEntries(formData);
  const parsed = signupFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.message,
    };
  }

  const res = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    if (res.status === 409) {
      return {
        status: FORM_STATUS.ERROR,
        message: 'このメールアドレスは使用済みです。',
      };
    } else {
      return {
        status: FORM_STATUS.ERROR,
        message: 'サインアップに失敗しました。',
      };
    }
  }

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'サインアップに成功しました。',
  };
}
