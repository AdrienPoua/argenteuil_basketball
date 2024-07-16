import { z } from "zod";

const LeadershipSchema = z.object({
  name: z.string(),
  number: z.string(),
  email: z.string(),
  teams: z.array(z.string()).optional(),
  img: z.string().optional(),
  isEmailDisplayed: z.boolean().optional(),
  isNumberDisplayed: z.boolean().optional(),
  isLeader: z.boolean().optional(),
  isCoach: z.boolean().optional(),
  job: z.string().optional(),
});

export default LeadershipSchema;
