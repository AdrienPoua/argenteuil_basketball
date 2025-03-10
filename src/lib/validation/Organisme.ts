import { z } from 'zod';

export const OrganismeSchema = z.object({
  id: z.number(),
  libelle: z.string(),
  code: z.string(),
});
