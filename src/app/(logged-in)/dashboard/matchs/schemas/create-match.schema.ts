import { z } from 'zod';

export const createMatchSchema = z.object({
  date: z.string().min(1, { message: 'La date est requise' }),
  time: z.string().min(1, { message: "L'heure est requise" }),
  opponentTeam: z.string().min(1, { message: "L'équipe adverse est requise" }),
  competition: z.string().min(1, { message: 'La compétition est requise' }),
  salle: z.string().optional(),
});

export type CreateMatchFormValues = z.infer<typeof createMatchSchema>;
