import { z } from "zod";

export const daySchema = z.enum([
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
]);

export const gymSchema = z.enum(["Jean_Guimier", "Jesse_Owens"]);

export const SessionSchema = z.object({
  day: daySchema,
  start: z.string(),
  end: z.string(),
  gym: gymSchema,
  teams: z.array(z.object({ id: z.string() })),
});
