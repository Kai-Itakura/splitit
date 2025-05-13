'use server';

import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';
import { createEventSchema } from '../schema/create-event.schema';
import { FORM_STATUS, FormActionState } from './form-state';

export const createEvent = async (
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  const raw = Object.fromEntries(formData);
  const parsedData = createEventSchema.safeParse(raw);

  if (!parsedData.success) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsedData.error.message,
    };
  }

  const { error, data } = await client.POST('/event-group', {
    body: parsedData.data,
  });

  if (error) {
    return {
      status: FORM_STATUS.ERROR,
      message: error.message,
    };
  }

  revalidatePath('/');

  return {
    status: FORM_STATUS.SUCCESS,
    message: data.message,
  };
};
