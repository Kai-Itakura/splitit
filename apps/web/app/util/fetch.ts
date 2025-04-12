import { API_URL } from '../constants/api-url';
import { getCookieString } from './get-cookie-string';
import { Result } from './result';

export const get = async <T>(
  path: string,
  requestInit: RequestInit = {},
): Promise<Result<T>> => {
  const options: RequestInit = {
    ...requestInit,
    method: 'GET',
    headers: {
      cookie: await getCookieString(),
    },
  };
  try {
    const res = await fetch(`${API_URL}/${path}`, options);

    if (!res.ok) {
      return {
        ok: false,
        error: { status: res.status, message: res.statusText },
      };
    }

    const data: T = await res.json();
    return {
      ok: true,
      data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: { status: 500, message: error.message } };
    }
    return {
      ok: false,
      error: { status: 500, message: 'Unknown error occurred!' },
    };
  }
};

export const post = async <T, U>(
  path: string,
  body: T,
  requestInit: RequestInit = {},
): Promise<Result<U>> => {
  const options: RequestInit = {
    ...requestInit,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: await getCookieString(),
    },
    body: JSON.stringify(body),
    credentials: 'include',
  };

  try {
    const res = await fetch(`${API_URL}/${path}`, options);

    if (!res.ok) {
      return {
        ok: false,
        error: {
          status: res.status,
          message: res.statusText,
        },
      };
    }

    const result: U = await res.json();
    return {
      ok: true,
      data: result,
    };
  } catch (error) {
    console.error('🔥 ~ error:', error);

    return {
      ok: false,
      error: {
        status: 500,
        message: 'Unknown error occurred!',
      },
    };
  }
};
