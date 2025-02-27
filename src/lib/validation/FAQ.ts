import { z } from 'zod';

export const FAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  position: z.number().default(0),
});
