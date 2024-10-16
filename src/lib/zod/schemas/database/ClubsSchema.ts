import { z } from "zod";

const DBClubSchema = z.object({
  name: z.string(),
  correspondant: z.object({
    name: z.string(),
    email: z.string(),
    number: z.string(),
  }),
});

export default DBClubSchema;
