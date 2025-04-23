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
    switch (response.status) {
      case 401: {
        redirect('/login');
      }
      // eslint-disable-next-line no-fallthrough
      case 404: {
        redirect('/404');
      }
      // eslint-disable-next-line no-fallthrough
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
