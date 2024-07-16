import { z } from 'zod';

const TrainingSchema = z.object({
  team: z.string().optional(),
  day: z.string(),
  start: z.string(),
  end: z.string(),
  gym: z.string(),
});

export default TrainingSchema;
