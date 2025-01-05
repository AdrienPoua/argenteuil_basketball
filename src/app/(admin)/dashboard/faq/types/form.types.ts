import { z } from "zod";
import { formSchema } from "../schemas/form.schema";

export type FAQFormData = z.infer<typeof formSchema>;
