import { z } from "zod";

export const BaseClubSchema = z.object({
  name: z.string(),
  contact: z.array(
    z.object({
      name: z.string().default("null"),
      number: z.string().default("null"),
      email: z.string().default("null"),
    })
  ).default([]),
});


export const ExistingClubSchema = BaseClubSchema.extend({
  id: z.number(),
  contact: z.array(z.object({ id: z.string() })),
});
