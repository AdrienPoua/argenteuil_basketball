import { z } from "zod";

const SDBFAQ = z.object({
  question: z.string(),
  answer: z.string(),
  rank: z.number(),
  _id: z.string().optional(),
});

export default SDBFAQ;