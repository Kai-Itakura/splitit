'use server';

import {
  FORM_STATUS,
  FormActionState,
} from '@/app/(contents)/actions/form-state';
import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';
import { updateExpenseSchema } from '../schema/update-expense.schema';

export const updateExpense = async (
  _: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  const raw = {
    ...Object.fromEntries(formData),
    payeeIds: formData.getAll('payeeIds'),
  };
  const parsed = updateExpenseSchema.safeParse(raw);

  if (parsed.error) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.message,
    };
  }

  const { amount, eventId, expenseId, ...data } = parsed.data;

  const { error } = await client.PUT(
    '/event-group/{groupId}/expense-record/{expenseId}',
    {
      params: {
        path: {
          groupId: eventId,
          expenseId,
        },
      },
      body: { ...data, amount: parseInt(amount) },
    },
  );

  if (error) {
    return {
      status: FORM_STATUS.ERROR,
      message: error.message,
    };
  }

  revalidatePath(`/event/${parsed.data.eventId}`);

  return {
    status: FORM_STATUS.SUCCESS,
    message: '立て替え記録を更新しました。',
  };
};
