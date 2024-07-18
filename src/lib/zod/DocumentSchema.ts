import { z } from "zod";

const DocumentSchema = z.object({
  title: z.string(),
  url: z.string(),
});

export default DocumentSchema;
