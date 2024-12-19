"use client";

import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis." }),
  image: z.instanceof(File).optional(),
  coach: z.string().optional(),
  division: z.string().optional(),
  training: z.array(
    z.object({
      day: z.enum([
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ]),
      start: z.string().min(1, { message: "Le début est requis." }),
      end: z.string().min(1, { message: "La fin est requise." }),
      gym: z.enum(["Jean Guimier", "Jesse Owens"]),
    }),
  ),
});
export type FormValues = z.infer<typeof formSchema>;
export interface ZodFormProps {
  defaultValues?: Omit<FormValues, "image"> & { id: string; image?: string };
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const stringSchema = z.string();

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
