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
    image: z.instanceof(File).optional(),
    isEmailDisplayed: z
    .boolean(), // Checkbox pour cacher l'email, booléen
  isNumberDisplayed: z
    .boolean(), // Checkbox pour cacher le numéro, booléen
});

export const handleUpdateImage = async (file: File): Promise<string> => {
  const urlSchema = z.string();
  const formData = new FormData();
  formData.append("file", file); // Fichier brut
  formData.append("fileName", file.name);
  const response = await fetch("/api/auth/imagekit", {
    method: "POST",
    body: formData,
  });
  const { url } = await response.json();
  const validatedUrl = urlSchema.parse(url);
  return validatedUrl;
};

export type FormValues = z.infer<typeof formSchema>;
export interface ZodFormProps {
  defaultValues?: Omit<FormValues, 'image' | 'teams'> & { id: string, teams?: string[], image?: string }
}
export const stringSchema = z.string();

