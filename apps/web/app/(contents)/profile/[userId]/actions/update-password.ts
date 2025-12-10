'use server';

import {
  FORM_STATUS,
  FormActionState,
} from '@/app/(contents)/actions/form-state';
import { client } from '@/openapi.config';
import { updatePasswordSchema } from '../schema/update-password.schema';

export const updatePassword = async (
  _state: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  const raw = Object.fromEntries(formData);
  const { data, error } = updatePasswordSchema.safeParse(raw);
  if (error) {
    return { status: FORM_STATUS.ERROR, message: error.message };
  }

  const { userId, ...body } = data;
  const { data: response, error: responseError } = await client.PATCH(
    '/auth/{userId}/password',
    {
      params: {
        path: {
          userId,
        },
      },
      body,
    },
  );

  if (responseError) {
    return { status: FORM_STATUS.ERROR, message: responseError.message };
  }

  return { status: FORM_STATUS.SUCCESS, message: response.message };
};
