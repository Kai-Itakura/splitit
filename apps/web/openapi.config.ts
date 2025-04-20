import createClient, { Middleware } from 'openapi-fetch';
import { API_URL } from './app/constants/api-url';
import { getCookieString } from './app/util/get-cookie-string';
import { paths } from './openapi/schema';

const openapiMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set('cookie', await getCookieString());
  },
};

export const client = createClient<paths>({
  baseUrl: API_URL,
});

client.use(openapiMiddleware);
