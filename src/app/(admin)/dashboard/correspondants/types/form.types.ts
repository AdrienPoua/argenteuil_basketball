import { z } from "zod";
import { formSchema } from "../schemas/form.schema";
import Club from "@/models/Club";

export type FormValues = z.infer<typeof formSchema>;

export type PropsType = {
  defaultValues: ReturnType<Club["toPlainObject"]>;
  setIsEditing: (isEditing: boolean) => void;
};