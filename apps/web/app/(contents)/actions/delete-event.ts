'use server';

import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';
import {
  BUTTON_ACTION_STATUS,
  ButtonActionStatus,
} from '../event/[eventId]/actions/button-action-status';

export const deleteEvent = async (
  eventId: string,
): Promise<ButtonActionStatus> => {
  const { data, error } = await client.DELETE('/event-group/{groupId}', {
    params: {
      path: {
        groupId: eventId,
      },
    },
  });

  if (error) {
    return { status: BUTTON_ACTION_STATUS.ERROR, message: error.message };
  }

  revalidatePath('/');

  return {
    status: BUTTON_ACTION_STATUS.SUCCESS,
    message: data.message,
  };
};
