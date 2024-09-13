import { ZodSchema, ZodError } from "zod";

export const ValidateWithZod = <T>(objectToCheck: T | T[], schema: ZodSchema<T>) => {
  try {
    if (Array.isArray(objectToCheck)) {
      objectToCheck.forEach((object) => {
        schema.parse(object);
      });
    } else {
      schema.parse(objectToCheck);
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("🚀 ~ ValidateWithZod ~ objectToCheck:", objectToCheck);
      throw new Error(`${JSON.stringify(error.errors)}`);
    } else {
      throw new Error("Unknown error");
    }
  }
};
