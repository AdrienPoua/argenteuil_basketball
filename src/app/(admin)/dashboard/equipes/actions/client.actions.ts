"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/form.schemas";
import { FormSchemaType, PropsType } from "../types/form.types";

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

export const useTeamForm = (defaultValues?: PropsType["defaultValues"]) => {
  const baseDefaultValues = {
    sessions: [],
    image: undefined,
    name: "",
    isCompetition: false,
    level: "",
    coach: "",
  };
  const defaultValuesFromProps = {
    ...defaultValues,
    image: defaultValues?.image ? new File([], defaultValues.image) : undefined,
    coach: defaultValues?.coach ? defaultValues.coach.id : "",
  };
  return useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ? defaultValuesFromProps : baseDefaultValues,
  });
};
