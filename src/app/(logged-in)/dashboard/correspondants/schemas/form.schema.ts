import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(1, 'Le code est requis'),
  libelle: z.string().min(1, 'Le nom du club est requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
});
