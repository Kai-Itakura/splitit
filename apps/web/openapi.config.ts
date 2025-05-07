import { redirect } from 'next/navigation';
import createClient, { Middleware } from 'openapi-fetch';
import { API_URL } from './app/constants/api-url';
import { getCookieString } from './app/util/get-cookie-string';
import { paths } from './openapi/schema';

const openapiMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set('cookie', await getCookieString());
  },

  async onResponse({ response }) {
    // トークンリフレッシュのリクエストのみNext.jsのMiddleware内で行うので無視
    if (response.url.includes('/auth/refresh')) return response;

    switch (response.status) {
      case 401: {
        redirect('/login');
      }
      // eslint-disable-next-line no-fallthrough
      case 404: {
        // イベント一覧を取得する際は404の時に作成ページを返すので無視
        if (!response.url.match(/\/event-group$/)) redirect('/404');
        break;
      }

      case 500: {
        redirect('/500');
      }
    }
  },
};

export const client = createClient<paths>({
  baseUrl: API_URL,
});

client.use(openapiMiddleware);
