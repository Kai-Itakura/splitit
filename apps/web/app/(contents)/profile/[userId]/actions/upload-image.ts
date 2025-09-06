'use server';

import {
  FORM_STATUS,
  FormActionState,
} from '@/app/(contents)/actions/form-state';
import { client } from '@/openapi.config';
import { components } from '@/openapi/schema';
import { profileImageSchema } from '../schema/profile-image.schema';

export const uploadImage = async (
  _state: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  const data = Object.fromEntries(formData);
  const parsed = profileImageSchema.safeParse(data);

  if (parsed.error) {
    return { status: FORM_STATUS.ERROR, message: parsed.error.message };
  }

  const res = await client.POST('/user/{userId}/image', {
    params: {
      path: {
        userId: parsed.data.userId,
      },
    },
    body: {
      image: formData,
    },
    bodySerializer: (body: components['schemas']['UploadImageDto']) => {
      if (body.image) {
        return formData;
      }
    },
  });

  if (res.error) {
    return { status: FORM_STATUS.ERROR, message: res.error.message };
  }

  return { status: FORM_STATUS.SUCCESS, message: res.data.message };
};
