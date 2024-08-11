import { z } from "zod";

const matchSchema = z.object({
  Division: z.string(),
  "N° de match ": z.string(),
  "Equipe 1": z.string(),
  "Equipe 2": z.string(),
  "Date de rencontre": z.string(),
  Heure: z.string(),
  Salle: z.string(),
  update: z.boolean().optional(),
});

export default matchSchema;
