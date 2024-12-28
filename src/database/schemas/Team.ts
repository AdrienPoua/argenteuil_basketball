import { z } from "zod";
import { SessionSchema } from "./Session";
import { MemberSchema } from "./Member";
import { IdSchema } from "./Id";

export const TeamSchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
  level: z.string().default("Departemental"),
  sessions: z.array(SessionSchema.merge(IdSchema)),
  coach: MemberSchema.extend({ id: z.string() }).nullable(),
});
