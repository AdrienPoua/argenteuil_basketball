import {
  BaseFAQSchema,
} from "@/database/schemas/FAQ";
import prisma from "@/database/prisma";
import { z } from "zod";

export class FAQService {
  private readonly BaseFAQSchema = BaseFAQSchema;
  private readonly ExistingFAQSchema = BaseFAQSchema.extend({ id: z.string() });

  async createFaq(data: z.infer<typeof this.BaseFAQSchema>) {
    const parsedFAQ = this.BaseFAQSchema.parse(data);
    try {
      return await prisma.fAQ.create({
        data: parsedFAQ,
      });
    } catch (error) {
      console.error("Erreur lors de la création du faq :", error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getFaqs() {
    try {
      return await prisma.fAQ.findMany({});
    } catch (error) {
      console.error("Erreur lors de la récupération des faqs :", error);
      throw error;
    }
  }

  async updateFaq(data: z.infer<typeof this.ExistingFAQSchema>) {
    const parsedFAQ = this.ExistingFAQSchema.parse(data);
    try {
      return await prisma.fAQ.update({
        where: { id: parsedFAQ.id },
        data: parsedFAQ,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du faq :", error);
      throw error;
    }
  }

  async pushRank(data: z.infer<typeof this.ExistingFAQSchema>) {
    const parsedFAQ = this.ExistingFAQSchema.parse(data);
    return await prisma.fAQ.update({
      where: { id: parsedFAQ.id },
      data: { position: parsedFAQ.position + 1 }
    });
  }

  async downRank(data: z.infer<typeof this.ExistingFAQSchema>) {
    const parsedFAQ = this.ExistingFAQSchema.parse(data);
    return await prisma.fAQ.update({
      where: { id: parsedFAQ.id },
      data: { position: parsedFAQ.position - 1 }
    });
  }

  async deleteFaq(id: string) {
    try {
      return await prisma.fAQ.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du faq :", error);
      throw error;
    }
  }
}
