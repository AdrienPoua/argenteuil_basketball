import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z
    .string()
    .email({
      message: "Veuillez entrer une adresse email valide",
    })
    .optional(),
  phone: z.string().optional(),
});
