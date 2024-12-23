import { z } from "zod";

export const CoachSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  number: z.string().min(8),
  image: z.string().optional(),
  isEmailDisplayed: z.boolean(),
  isNumberDisplayed: z.boolean(),
  type: z.literal("coach"),
  teams: z.array(z.object({ id: z.string() })),
});

export const ExistingCoachSchema = CoachSchema.extend({
  id: z.string(),
});
