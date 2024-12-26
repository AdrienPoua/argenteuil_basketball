import { z } from "zod";

export const typeSchema = z.enum([
  "Trésorier",
  "Président",
  "Correspondant",
  "Secrétaire_Général",
  "Entraineur",
  "Webmaster",
]);

export const MemberSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(8),
    isPublicEmail: z.boolean().default(false),
    isPublicPhone: z.boolean().default(false),
    isLeader: z.boolean().default(false),
    type: z.array(typeSchema),
    image: z.string().nullable(),
    teams: z.array(z.object({ id: z.string() })),
  })
  .strict();
