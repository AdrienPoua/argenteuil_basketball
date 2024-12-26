"use server"
import { z } from "zod"




export const formSchema = z.object({
  name: z
    .string(),
  email: z
    .string()
    .email({ message: "Email invalide." }),
  number: z.string(),
  image: z.instanceof(File).optional(),
  isEmailDisplayed: z
    .boolean(),
  isNumberDisplayed: z
    .boolean(),
  teams: z
    .array(z.object({
      id: z.string()
    }))
    .optional(),
  type: z.enum(["coach", "leader"]),
  role: z
    .enum(["Président", "Trésorier", "Correspondant", "Secrétaire Général", "Entraineur", ""])
    .optional(),
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


