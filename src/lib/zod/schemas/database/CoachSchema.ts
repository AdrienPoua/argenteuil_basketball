import { z } from "zod";

export const CoachSchema = z.object({
  name: z.string(),
  teams: z.array(z.string()),
  email: z.string(),
  number: z.string(),
  isEmailDisplayed: z.boolean().optional(),
  isNumberDisplayed: z.boolean().optional(),
  image: z.string().optional(),
  _id: z.string(),
});

export default CoachSchema;
