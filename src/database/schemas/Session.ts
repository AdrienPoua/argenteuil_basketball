import { z } from "zod";

export const SessionSchema = z.object({
  day: z.enum([
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ]),
  start: z.string(),
  end: z.string(),
  gym: z.enum(["Jean_Guimier", "Jesse_Owens"]),
  assignedTeams: z.array(z.object({ id: z.string() })),
});

export const ExistingSessionSchema = SessionSchema.extend({
  id: z.string(),
});
