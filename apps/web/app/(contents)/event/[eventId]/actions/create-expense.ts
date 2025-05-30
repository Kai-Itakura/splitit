'use server';

import {
  FORM_STATUS,
  FormActionState,
} from '@/app/(contents)/actions/form-state';
import { client } from '@/openapi.config';
import { revalidatePath } from 'next/cache';
import { createExpenseSchema } from '../schema/create-expense.schema';

export const createExpense = async (
  _: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  const raw = {
    ...Object.fromEntries(formData),
    payeeIds: formData.getAll('payeeIds'),
  };
  const parsed = createExpenseSchema.safeParse(raw);

  if (parsed.error) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.message,
    };
  }

  const { amount, eventId, ...data } = parsed.data;

  const { error } = await client.POST('/event-group/{groupId}/expense-record', {
    params: { path: { groupId: eventId } },
    body: { ...data, amount: parseInt(amount) },
  });

  if (error) {
    return {
      status: FORM_STATUS.ERROR,
      message: error.message,
    };
  }

  revalidatePath(`/event/${parsed.data.eventId}`);

  return {
    status: FORM_STATUS.SUCCESS,
    message: '立て替え記録を作成しました。',
  };
};
