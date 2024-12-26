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
  teams: z.array(z.object({ id: z.string() })),
});
