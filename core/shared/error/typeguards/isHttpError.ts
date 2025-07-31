export function isHttpError(error: unknown): error is { status: number; statusText: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as { status: unknown }).status === "number" &&
      "statusText" in error &&
      typeof (error as { statusText: unknown }).statusText === "string"
    );
  }