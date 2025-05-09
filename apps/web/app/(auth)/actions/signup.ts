'use server';

import { client } from '@/openapi.config';
import {
  FORM_STATUS,
  FormActionState,
} from '../../(contents)/actions/form-state';
import { signupFormSchema } from '../schema/signup-form.schema';

export async function signup(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const body = Object.fromEntries(formData);
  const parsed = signupFormSchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.message,
    };
  }

  const { error, data } = await client.POST('/auth/signup', {
    body: parsed.data,
  });

  if (error) {
    return {
      status: FORM_STATUS.ERROR,
      message: error.message,
    };
  }

  return {
    status: FORM_STATUS.SUCCESS,
    message: data.message,
  };
}
