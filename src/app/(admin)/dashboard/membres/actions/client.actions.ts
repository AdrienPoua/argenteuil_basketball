"use client";
import { z } from "zod";
import { createMember, updateMember } from "./server.actions";
import { FormSchemaType, PropsType } from "../types/form.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../schemas/form.schema";
import { Roles } from "@prisma/client";

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

export const handleSubmit = async (
  data: FormSchemaType,
  defaultValues: PropsType["defaultValues"],
) => {
  let imageUrl = undefined;
  if (data.image) {
    const imageDidntChange =
      defaultValues && defaultValues.image === data.image?.name;
    imageUrl = imageDidntChange
      ? defaultValues.image
      : await getImageUrl(data.image);
  }
  if (defaultValues) {
    await updateMember({ ...data, image: imageUrl, id: defaultValues.id });
  } else {
    await createMember({ ...data, image: imageUrl });
  }
};

export const useMemberForm = (defaultValues?: PropsType["defaultValues"]) => {
  return useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
      ? {
          id: defaultValues.id,
          name: defaultValues.name,
          phone: defaultValues.privatePhone,
          email: defaultValues.privateEmail,
          image: defaultValues.image
            ? new File([], defaultValues.image)
            : undefined,
          isPublicEmail: !!defaultValues.email,
          isPublicPhone: !!defaultValues.phone,
          isLeader: defaultValues.isLeader,
          role: defaultValues.role as Roles[],
          teams: defaultValues.teams ?? [],
        }
      : {
          teams: [],
          isLeader: false,
          role: [],
          image: undefined,
          name: "",
          phone: "",
          email: "",
          isPublicEmail: false,
          isPublicPhone: false,
        },
  });
};
