import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  code: z.string(),
  libelle: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});
