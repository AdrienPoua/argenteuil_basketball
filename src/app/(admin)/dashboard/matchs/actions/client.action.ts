"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PropsType, FormValues } from "../types/form.types";
import { formSchema } from "../schemas/form.schema";

export const useMatchForm = (match: PropsType["match"]) => {
  return useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: match.ISOdate,
      time: match.formatedTime,
      salle: match.salle,
    },
  });
};
