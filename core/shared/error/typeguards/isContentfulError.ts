export function isContentfulError(error: unknown): error is { message: string; status?: number; details?: unknown } {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string" &&
      ("status" in error || "details" in error)
    );
  }