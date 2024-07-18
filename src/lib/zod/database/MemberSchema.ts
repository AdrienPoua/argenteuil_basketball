import { z } from "zod";

const DBMemberSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  birthday: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  statut: z.string(),
  year: z.string(),
  categorie: z.string(),
  _id: z.string(),
});

export default DBMemberSchema;
