import { IdSchema } from "@/database/schemas/Id";
import { TeamSchema } from "@/database/schemas/Team";
import { Roles } from "@prisma/client";
import { z } from "zod";

export const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  image: z.instanceof(File).optional(),
  isPublicEmail: z.boolean(),
  isPublicPhone: z.boolean(),
  isLeader: z.boolean(),
  role: z.array(z.nativeEnum(Roles)),
  teams: z.array(TeamSchema.merge(IdSchema)),
});
