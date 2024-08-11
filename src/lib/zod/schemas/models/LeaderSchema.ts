import { z } from "zod";
import StaffSchema from "./StaffSchema";

const LeaderSchema = StaffSchema.extend({
  teams: z.array(z.string()).optional(),
  job: z.string(),
});

export default LeaderSchema;

