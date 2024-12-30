"use client";
import { z } from "zod";

export const getImageUrl = async (file: File) => {
  if (!file) return;
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
