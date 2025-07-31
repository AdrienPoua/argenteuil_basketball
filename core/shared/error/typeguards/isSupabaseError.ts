export function isSupabaseError(error: unknown): error is { error: { message: string; details?: unknown }; status?: number } {
    return (
      typeof error === "object" &&
      error !== null &&
      "error" in error &&
      typeof (error as { error: unknown }).error === "object" &&
      (error as { error: { message?: string } }).error?.message !== undefined
    );
  }