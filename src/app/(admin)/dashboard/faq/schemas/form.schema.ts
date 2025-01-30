import { z } from 'zod';

export const formSchema = z.object({
  question: z.string().min(1, 'La question est requise'),
  answer: z.string().min(1, 'La réponse est requise'),
  position: z.number().default(0),
});
