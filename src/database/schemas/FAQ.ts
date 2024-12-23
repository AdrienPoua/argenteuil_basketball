import { z } from "zod";

export const BaseFAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
  position: z.number(),
});

export const ExistingFAQSchema = BaseFAQSchema.extend({
  id: z.string(),
});
