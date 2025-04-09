import { API_URL } from '../constants/api-url';
import { Result } from '../types/result.type';

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
