"use server"
import { z } from "zod"
import { TeamSchema } from "@/database/schemas/Team"
import { IdSchema } from "@/database/schemas/Id"



export const formSchema = z.object({
  name: z
    .string(),
  email: z
    .string()
    .email(),
  phone: z.string(),
  image: z.instanceof(File).optional(),
  isPublicEmail: z
    .boolean(),
  isPublicPhone: z
    .boolean(),
  teams: z
    .array(TeamSchema.merge(IdSchema))
    .optional(),
  isLeader: z
    .boolean(),
  role: z
    .enum(["Président", "Trésorier", "Correspondant", "Secrétaire Général", "Entraineur", "Webmaster"])
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


