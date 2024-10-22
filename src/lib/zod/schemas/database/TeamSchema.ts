import { z } from "zod";

const training = z.object({
  day: z.string(),
  start: z.string(),
  end: z.string(),
  gym: z.string(),
});

export const TeamSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  coach : z.string().optional(),
  training : z.array(training),
  division : z.string().optional(),
});

export default TeamSchema;