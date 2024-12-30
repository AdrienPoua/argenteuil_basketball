import { z } from "zod";
import { TeamSchema } from "@/database/schemas/Team";
import { IdSchema } from "@/database/schemas/Id";

export const roleSchema = z.enum([
  "Trésorier",
  "Président",
  "Correspondant",
  "Secrétaire_Général",
  "Entraineur",
  "Webmaster",
]);

export const MemberSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(8),
  isPublicEmail: z.boolean().default(false),
  isPublicPhone: z.boolean().default(false),
  isLeader: z.boolean().default(false),
  role: z.array(roleSchema),
  image: z.string().optional(),
});

