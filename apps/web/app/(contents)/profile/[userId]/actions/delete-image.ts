'use server';

import {
  BUTTON_ACTION_STATUS,
  ButtonActionStatus,
} from '@/app/(contents)/event/[eventId]/actions/button-action-status';
import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';

export default async function deleteImage(
  userId: string,
): Promise<ButtonActionStatus> {
  const res = await client.DELETE('/user/{userId}/image', {
    params: { path: { userId } },
  });

  if (res.error) {
    return {
      status: BUTTON_ACTION_STATUS.ERROR,
      message: res.error.message,
    };
  }

  revalidatePath(`profile${userId}`);
  return {
    status: BUTTON_ACTION_STATUS.SUCCESS,
    message: res.data.message,
  };
}
