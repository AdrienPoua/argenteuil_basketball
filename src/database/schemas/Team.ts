import { z } from "zod";

const GymnasesSchema = z.enum(["Jean_Guimier", "Jesse_Owens"]);
const DaysSchema = z.enum([
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
]);
export type Gymnases = z.infer<typeof GymnasesSchema>;
export type Days = z.infer<typeof DaysSchema>;

export const SessionSchema = z.object({
  day: DaysSchema,
  start: z.string(),
  end: z.string(),
  gymnase: GymnasesSchema
});

export const TeamSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
  level: z.string().default("Departemental"),
  sessions: z.array(SessionSchema),
});
