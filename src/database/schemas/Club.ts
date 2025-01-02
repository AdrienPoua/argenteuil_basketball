import { z } from "zod";

export const ClubSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
});


