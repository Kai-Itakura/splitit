type Success<T> = { ok: true; data: T };

type Error = { ok: false; error: { status: number; message: string } };

export type Result<T> = Success<T> | Error;
