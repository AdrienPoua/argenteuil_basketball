import { z } from "zod";

const StaffSchema = z.object({
  name: z.string(),
  number: z.string(),
  email: z.string(),
  img: z.string(),
  isEmailDisplayed: z.boolean(),
  isNumberDisplayed: z.boolean(),
});

export default StaffSchema;

