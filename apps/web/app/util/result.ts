type Error = {
  status: number;
  message: string;
};

export type Ok<T> = { ok: true; data: T };
export type Fail = { ok: false; error: Error };
export type Result<T> = Ok<T> | Fail;

export const ok = <T>(data: T): Ok<T> => ({
  ok: true,
  data,
});
export const fail = (error: Error): Fail => ({ ok: false, error });

export const isOk = <T>(input: Result<T>): input is Ok<T> => input.ok;
export const isFail = <T>(input: Result<T>): input is Fail => !input.ok;
