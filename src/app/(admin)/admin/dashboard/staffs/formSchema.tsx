import { z } from "zod"

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom est requis." }), // Champ obligatoire
  email: z
    .string()
    .email({ message: "Email invalide." })
    .min(1, { message: "L'email est requis." }), // Champ obligatoire avec format email
  number: z
    .string()
    .min(1, { message: "Le numéro est requis." }), // Champ obligatoire
  teams: z
    .array(z.object({
      name: z.string().min(1, { message: "Le nom de l'équipe est requis." }), // Champ obligatoire pour le nom de l'équipe
    }))
    .optional(),
  job: z
    .enum(["Président", "Trésorier", "Correspondant", "Secrétaire Général", "Entraineur", ""]) // Correspond aux options du select
    .optional(), // Ce champ est optionnel
  image: z.union([
    z.instanceof(File),  // Accepte une instance de File (avant upload)
    z.string().url(),    // Accepte une URL (après upload)
  ]).optional(),
  isEmailDisplayed: z
    .boolean(), // Checkbox pour cacher l'email, booléen
  isNumberDisplayed: z
    .boolean(), // Checkbox pour cacher le numéro, booléen
});
