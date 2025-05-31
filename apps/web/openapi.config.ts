import { redirect } from 'next/navigation';
import createClient, { Middleware } from 'openapi-fetch';
import { API_URL } from './app/(contents)/constants/api-url';
import { getCookieString } from './app/util/get-cookie-string';
import { setRequestCookies } from './app/util/set-request-cookies';
import { paths } from './openapi/schema';

// 再リクエスト用のキャッシュ
let requestClone: Request;

const openapiMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set('cookie', await getCookieString());
    if (!request.url.includes('/auth/refresh')) {
      requestClone = request.clone();
    }
  },

  async onResponse({ response }) {
    // トークンリフレッシュのリクエストのみNext.jsのMiddleware内で行うので無視
    if (response.url.includes('/auth/refresh')) return response;

    switch (response.status) {
      case 401: {
        return refetch();
      }

      case 500: {
        redirect('/500');
      }

      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  },
};

export const client = createClient<paths>({
  baseUrl: API_URL,
});

client.use(openapiMiddleware);

async function refetch() {
  const { data, error } = await client.POST('/auth/refresh');

  if (error) {
    redirect('/login');
  }

  await setRequestCookies(data);
  requestClone.headers.set('cookie', await getCookieString());
  const res = await fetch(requestClone);

  return res;
}
