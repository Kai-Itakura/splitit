'use server';

import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';
import {
  BUTTON_ACTION_STATUS,
  ButtonActionStatus,
} from './button-action-status';

export const deleteExpense = async (
  eventId: string,
  expenseId: string,
): Promise<ButtonActionStatus> => {
  const { error } = await client.DELETE(
    '/event-group/{groupId}/expense-record/{expenseId}',
    {
      params: {
        path: { groupId: eventId, expenseId },
      },
    },
  );

  if (error) {
    return {
      status: BUTTON_ACTION_STATUS.ERROR,
      message: error.message,
    };
  }

  revalidatePath(`/event/${eventId}`);

  return {
    status: BUTTON_ACTION_STATUS.SUCCESS,
    message: '立て替え記録を削除しました。',
  };
};
