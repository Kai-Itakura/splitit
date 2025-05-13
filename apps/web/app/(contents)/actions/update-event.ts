'use server';

import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';
import { updateEventSchema } from '../schema/update-event.schema';
import { FORM_STATUS, FormActionState } from './form-state';

export const updateEvent = async (
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  const raw = Object.fromEntries(formData);
  const parsed = updateEventSchema.safeParse(raw);

  if (parsed.error) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.message,
    };
  }

  const { error } = await client.PUT('/event-group/{groupId}', {
    params: { path: { groupId: parsed.data.id } },
    body: parsed.data,
  });

  if (error) return { status: FORM_STATUS.ERROR, message: error.message };

  revalidatePath(`/event/${parsed.data.id}`);

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'イベントを更新しました。',
  };
};
