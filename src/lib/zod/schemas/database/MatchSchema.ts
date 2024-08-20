import { z } from "zod";

const DBMatchSchema = z.object({
  division: z.string(),
  matchNumber: z.string(),
  teamA: z.string(),
  teamB: z.string(),
  date: z.string(),
  time: z.string(),
  gym: z.string(),
});

export default DBMatchSchema;
