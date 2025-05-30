'use server';

import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';
import {
  BUTTON_ACTION_STATUS,
  ButtonActionStatus,
} from './button-action-status';

export const addUser = async (
  userId: string,
  eventId: string,
): Promise<ButtonActionStatus> => {
  const { error } = await client.PUT('/event-group/{groupId}/member', {
    params: { path: { groupId: eventId } },
    body: { memberId: userId },
  });

  if (error)
    return { status: BUTTON_ACTION_STATUS.ERROR, message: error.message };

  revalidatePath(`/event/${eventId}`);

  return {
    status: BUTTON_ACTION_STATUS.SUCCESS,
    message: 'ユーザーを追加しました。',
  };
};
