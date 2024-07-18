import { z } from "zod";

const DBMemberTypeSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  birthday: z.string(),
  createdAt: z.date(),
  statut: z.string(),
  year: z.string(),
  categorie: z.string(),
  __v : z.number(),
  _id: z.string(),
});

export default DBMemberTypeSchema;
