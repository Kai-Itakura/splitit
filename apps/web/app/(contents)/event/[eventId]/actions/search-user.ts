'use server';

import { FORM_STATUS } from '@/app/(contents)/actions/form-state';
import { User } from '@/app/(contents)/header/types/user.type';
import { client } from '@/openapi.config';
import { z } from 'zod';
import {
  getSearchFormSchema,
  SEARCH_TYPE,
} from '../schema/search-user-form.schema';

type FormActionState =
  | {
      status: typeof FORM_STATUS.IDLE;
    }
  | {
      status: typeof FORM_STATUS.SUCCESS;
      data: User;
    }
  | {
      status: typeof FORM_STATUS.ERROR;
      message: string;
    };

export const searchUser = async (
  _: FormActionState,
  formData: FormData,
): Promise<FormActionState> => {
  const raw = Object.fromEntries(formData);
  const typeSchema = z
    .object({
      type: z.enum([SEARCH_TYPE.EMAIL, SEARCH_TYPE.ID]),
    })
    .brand('search-type-schema');
  const parseResult = typeSchema.safeParse(raw);

  if (parseResult.error) {
    return {
      status: FORM_STATUS.ERROR,
      message: '検索タイプが無効です。',
    };
  }

  const { type } = parseResult.data;
  const parsed = getSearchFormSchema(type).safeParse(raw);

  if (parsed.error) {
    return {
      status: FORM_STATUS.ERROR,
      message: '有効なメールアドレスを入力してください。',
    };
  }

  const { error, data } =
    type === SEARCH_TYPE.EMAIL
      ? await client.GET('/user', {
          params: { query: { email: parsed.data.value } },
        })
      : await client.GET('/user/{userId}', {
          params: { path: { userId: parsed.data.value } },
        });

  if (error) return { status: FORM_STATUS.ERROR, message: error.message };

  return { status: FORM_STATUS.SUCCESS, data };
};
