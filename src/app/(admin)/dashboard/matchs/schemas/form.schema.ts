import { z } from 'zod';

export const formSchema = z.object({
  date: z.string(),
  time: z.string(),
  salle: z.string(),
});
