import { z } from "zod";

export const MemberSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(8),
  publicEmail: z.boolean(),
  publicPhone: z.boolean(),
  leader: z.boolean(),
  type: z.array(
    z.enum([
      "Trésorier",
      "Président",
      "Correspondant",
      "Secrétaire_Général",
      "Entraineur",
      "Webmaster",
    ]),
  ),
  image: z.string().nullable(),
  teams: z.array(z.object({ id: z.string() })),
}).strict();
