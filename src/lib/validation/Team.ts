import { z } from 'zod';
import { MemberSchema } from './Member';

export const GymnasesSchema = z.enum(['Jean_Guimier', 'Jesse_Owens']);
export const DaysSchema = z.enum(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']);
export type Gymnases = z.infer<typeof GymnasesSchema>;
export type Days = z.infer<typeof DaysSchema>;

export const SessionSchema = z.object({
  day: DaysSchema,
  start: z.string(),
  end: z.string(),
  gymnase: z.string(),
});

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  level: z.string(),
  sessions: z.array(SessionSchema),
  isCompetition: z.boolean().default(false),
  championnats: z.array(z.string()).default([]),
  coach: MemberSchema.optional().nullable(),
});
