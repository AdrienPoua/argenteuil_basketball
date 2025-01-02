import { z } from "zod";

export const ClubSchema = z.object({
  id: z.string(),
  code: z.string(),
  libelle: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
});



