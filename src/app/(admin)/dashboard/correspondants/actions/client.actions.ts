"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/form.schema";
import { FormValues, PropsType } from "../types/form.types";

export const useClubForm = (defaultValues: PropsType["defaultValues"]) => {
  return useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
};
