import { redirect } from 'next/navigation';
import createClient, { Middleware } from 'openapi-fetch';
import { API_URL } from './app/(contents)/constants/api-url';
import { getTokenPairFromCookie } from './app/util/get-cookie-string';
import { setResponseCookies } from './app/util/set-response-cookies';
import { paths } from './openapi/schema';

// 再リクエスト用のキャッシュ
let requestClone: Request;

const openapiMiddleware: Middleware = {
  async onRequest({ request }) {
    if (!request.url.includes('/auth/refresh')) {
      const { accessToken } = await getTokenPairFromCookie();
      request.headers.set('Authorization', `Bearer ${accessToken}`);
      requestClone = request.clone();
    }
  },

  async onResponse({ response }) {
    // トークンリフレッシュのリクエストのみNext.jsのMiddleware内で行うので無視
    if (
      response.url.includes('/auth/refresh') ||
      response.url.includes('/auth/login')
    )
      return response;

    if (response.status === 401) {
      return refetch();
    }
  },
};

export const client = createClient<paths>({
  baseUrl: API_URL,
});

client.use(openapiMiddleware);

async function refetch() {
  const { refreshToken } = await getTokenPairFromCookie();
  const { data, error } = await client.POST('/auth/refresh', {
    body: {
      refreshToken,
    },
  });

  if (error) {
    redirect('/login');
  }

  await setResponseCookies(data);
  const accessToken = data.accessToken.value;
  requestClone.headers.set('Authorization', `Bearer ${accessToken}`);
  const res = await fetch(requestClone);

  return res;
}
