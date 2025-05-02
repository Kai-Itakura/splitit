'use server';

import { createEventSchema } from '../create-event.schema';
import { FORM_STATUS, FormActionState } from './form-state';

export const createEvent = async (
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  console.log('🔥 ~ createEvent ~ formData:', formData);
  const body = Object.fromEntries(formData);
  const parsedData = createEventSchema.safeParse(body);

  if (!parsedData.success) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsedData.error.message,
    };
  }

  return _prevState;
};
