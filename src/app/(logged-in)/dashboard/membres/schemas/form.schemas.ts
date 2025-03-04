import { Roles } from '@prisma/client';
import { z } from 'zod';

export const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Le nom est requis" }),
  phone: z.string().min(8, { message: "Le numéro de téléphone est requis" }),
  email: z.string().email({ message: "Format d'email invalide" }),
  image: z.instanceof(File).optional(),
  isPublicEmail: z.boolean(),
  isPublicPhone: z.boolean(),
  isLeader: z.boolean(),
  role: z.array(z.nativeEnum(Roles)).min(1, { message: "Sélectionnez au moins un rôle" }),
  teams: z.array(z.string()),
});
