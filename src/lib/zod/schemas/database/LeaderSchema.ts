import { z } from "zod";

export const LeaderSchema = z.object({
  name: z.string(),
  teams: z.array(z.string()).optional(),
  email: z.string(),
  number: z.string(),
  isEmailDisplayed: z.boolean().optional(),
  isNumberDisplayed: z.boolean().optional(),
  job: z.enum(["Président", "Trésorier", "Correspondant", "Secrétaire Général", "Entraineur", ""]), // Correspond aux options du select
  image: z.string().optional(),
});

export default LeaderSchema;
