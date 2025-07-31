export function isAuthError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const err = error as { status?: number; message?: string };
  return (
    err.status === 401 ||
    err.status === 403 ||
    (typeof err.message === 'string' &&
      (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('forbidden')))
  );
}
