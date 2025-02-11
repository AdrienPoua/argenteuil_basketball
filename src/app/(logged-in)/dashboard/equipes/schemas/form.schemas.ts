import { z } from 'zod';
import { SessionSchema } from '@/lib/validation/Team';

export const formSchema = z.object({
  name: z.string(),
  image: z.instanceof(File).optional(),
  level: z.string(),
  sessions: z.array(SessionSchema),
  coach: z.string().optional(),
  isCompetition: z.boolean().default(false),
  championnats: z.array(z.string()),
});
