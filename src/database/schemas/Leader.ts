import { z } from "zod";

export const LeaderSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  number: z.string().min(8),
  image: z.string().optional(),
  isEmailDisplayed: z.boolean(),
  isNumberDisplayed: z.boolean(),
  type: z.literal("leader"),
  role: z.enum([
    "Trésorier",
    "Président",
    "Correspondant",
    "Secrétaire_Général",
  ]),
});

export const ExistingLeaderSchema = LeaderSchema.extend({
  id: z.string(),
});