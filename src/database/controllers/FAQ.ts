"use server";
import FAQ from "@/database/models/FAQ";
import CRUD from "@/database/crud";
import { z } from "zod";

// Initialisation de l'objet CRUD pour le modèle FAQ
const faqCrud = new CRUD(FAQ);

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
  rank: z.number(),
  _id : z.string(),
});

type TFAQ = z.infer<typeof faqSchema>;

export async function createFAQ(faq: unknown): Promise<void> {
  const parsedFAQ = faqSchema.parse(faq);
  return faqCrud.create(parsedFAQ);
}

export async function getFAQ(): Promise<TFAQ[]> {
  return faqCrud.read();
}

export async function deleteFAQ(id: string): Promise<void> {
  return faqCrud.remove({ _id: id });
}

export async function updateRank(payload: { id: string; rank: number }): Promise<void> {
  const { id, rank } = payload;
  return faqCrud.update({ _id: id }, { rank });
}
