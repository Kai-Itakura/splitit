import { post } from '@/app/util/fetch';
import { TokenPair } from '@/app/util/generate-auth-cookies';
import { fail, ok, Result } from '@/app/util/result';

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
