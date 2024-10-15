import { z } from "zod";

export const StaffSchema = z.object({
  name: z.string(),
  teams: z.array(z.string()).optional(),
  email: z.string(),
  number: z.string(),
  isEmailDisplayed: z.boolean().optional(),
  isNumberDisplayed: z.boolean().optional(),
  job: z.string().optional(),
  image: z.string().optional(),
  _id: z.string(),
});

export default StaffSchema;
