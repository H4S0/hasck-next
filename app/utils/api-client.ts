import axios from 'axios';

export type ApiErrorShape =
  | { error: string }
  | { error: { message: string; code?: string; details?: unknown } };

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError<ApiErrorShape>(err)) {
    const payload = err.response?.data;
    if (!payload) return err.message;
    if (typeof payload.error === 'string') return payload.error;
    return payload.error.message ?? err.message;
  }
  if (err instanceof Error) return err.message;
  return String(err);
}
