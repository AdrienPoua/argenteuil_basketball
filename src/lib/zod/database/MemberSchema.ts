import { z } from "zod";
import { Types } from "mongoose";

const DBMemberTypeSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  birthday: z.string(),
  createdAt: z.date(),
  statut: z.string(),
  year: z.string(),
  categorie: z.string(),
  _id: z.instanceof(Types.ObjectId), // Validation pour ObjectId de mongoose
});

export default DBMemberTypeSchema;
