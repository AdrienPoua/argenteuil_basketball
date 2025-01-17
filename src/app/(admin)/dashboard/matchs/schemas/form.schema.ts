import { z } from "zod";

export const formSchema = z.object({
  date: z.date(),
  time: z.string(),
  salle: z.string(),
});
