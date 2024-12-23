import { z } from "zod";
import { ExistingSessionSchema } from "@/database/schemas/Session";

export const BaseTeamSchema = z.object({
  name: z.string(),
  coach: z.object({ id: z.string() }).optional(),
  division: z.string().optional(),
  sessions: z.array(ExistingSessionSchema),
});

export const ExistingTeamSchema = BaseTeamSchema.extend({
  id: z.string(),
  sessions: z.array(ExistingSessionSchema),
});
