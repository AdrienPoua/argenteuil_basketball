import { z } from "zod";

export const TeamSchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
  level: z.string().default("Departemental"),
  sessions: z.array(z.object({ id: z.string() })),
  coachs: z.array(z.object({ id: z.string() })),
});

