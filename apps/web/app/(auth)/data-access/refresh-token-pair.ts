import { post } from '@/app/util/fetch';
import { fail, ok, Result } from '@/app/util/result';
import { TokenPair } from '@repo/types';

export const refreshTokenPair = async (
  path: string,
): Promise<Result<TokenPair>> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const result = await post<{}, TokenPair>(path, {});

  if (!result.ok) {
    return fail(result.error);
  }

  return ok(result.data);
};
