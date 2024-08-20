import { z } from "zod";

export const MemberSchema = z.object({
  role: z.string(),
  name: z.string(),
  email: z.string(),
  number: z.string(),
});

const DBClubSchema = z.object({
  name: z.string(),
  members: z.array(MemberSchema),
});

export default DBClubSchema;
