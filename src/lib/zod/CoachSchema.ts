import { z } from "zod";
import StaffSchema from "./StaffSchema";

const CoachSchema = StaffSchema.extend({
  teams: z.array(z.string()).optional(),
});

export default CoachSchema;
