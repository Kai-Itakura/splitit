import { z } from 'zod';

const SEARCH_TYPE = {
  EMAIL: 'email',
  ID: 'id',
} as const;

type SearchType = (typeof SEARCH_TYPE)[keyof typeof SEARCH_TYPE];

const searchUserByEmailSchema = z
  .object({
    type: z.literal(SEARCH_TYPE.EMAIL),
    value: z
      .string()
      .email({ message: '有効なメールアドレスを入力してください。' }),
  })
  .brand('search-user-by-email-schema');

const searchUserByIdSchema = z
  .object({
    type: z.literal(SEARCH_TYPE.ID),
    value: z.string().min(1, '１文字以上入力してください。'),
  })
  .brand('search-user-by-id-schema');

const getSearchFormSchema = (searchType: SearchType) => {
  return searchType === SEARCH_TYPE.EMAIL
    ? searchUserByEmailSchema
    : searchUserByIdSchema;
};

type SearchUserEmailSchema = z.infer<typeof searchUserByEmailSchema>;
type SearchUserByIdSchema = z.infer<typeof searchUserByIdSchema>;
type SearchFormSchema = z.infer<ReturnType<typeof getSearchFormSchema>>;

export {
  getSearchFormSchema,
  SEARCH_TYPE,
  searchUserByEmailSchema,
  searchUserByIdSchema,
};
export type {
  SearchFormSchema,
  SearchType,
  SearchUserByIdSchema,
  SearchUserEmailSchema as SearchUserEmailIdSchema,
};
