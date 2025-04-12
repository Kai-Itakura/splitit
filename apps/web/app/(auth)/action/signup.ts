'use server';

import { post } from '@/app/util/fetch';
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

  const result = await post('auth/signup', parsed.data);

  if (!result.ok) {
    return {
      status: FORM_STATUS.ERROR,
      message:
        result.error.status === 409
          ? 'このメールアドレスは使用済みです。'
          : 'サインアップに失敗しました。',
    };
  }

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'サインアップに成功しました。',
  };
}
