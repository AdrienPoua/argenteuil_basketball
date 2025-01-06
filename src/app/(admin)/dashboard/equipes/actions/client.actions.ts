"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/form.schemas";
import { FormSchemaType, PropsType } from "../types/form.types";
import useToken from "@/hooks/useToken";
import { useQuery } from "react-query";
import getCompetitions from "@/services/api/getCompetitions";

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
    championnats: [],
  };
  const defaultValuesFromProps = {
    ...defaultValues,
    image: defaultValues?.image ? new File([], defaultValues.image) : undefined,
    coach: defaultValues?.coach ? defaultValues.coach.id : "",
    sessions: defaultValues?.sessions ? defaultValues.sessions.map((session) => ({
      ...session,
      gymnase: session.gymnase.replace(" ", "_") as "Jean_Guimier" | "Jesse_Owens",
    })) : [],
  };
  return useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ? defaultValuesFromProps : baseDefaultValues,
  });
};

export const useCompetitions = () => {
  const { token } = useToken();
  const { data: competitions } = useQuery(
    ["competitions", token],
    () => getCompetitions(token as string),
    { enabled: !!token },
  );
  return competitions?.map((competition) => competition.code);
};
