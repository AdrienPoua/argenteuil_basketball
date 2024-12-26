import { z } from "zod";

export const ClubSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});


