import { FAQSchema } from '@/lib/validation/FAQ';
import prisma from '@/database/prisma';
import { z } from 'zod';

class FAQService {
  private readonly createDataSchema = FAQSchema.omit({ id: true });

  async createFaq(data: z.infer<typeof this.createDataSchema>) {
    try {
      return await prisma.fAQ.create({
        data,
      });
    } catch (error) {
      console.error('Erreur lors de la création du faq :', error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getFaqs() {
    try {
      return await prisma.fAQ.findMany({});
    } catch (error) {
      console.error('Erreur lors de la récupération des faqs :', error);
      throw error;
    }
  }

  async updateFaq(data: z.infer<typeof FAQSchema>) {
    try {
      return await prisma.fAQ.update({
        where: { id: data.id },
        data,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du faq :', error);
      throw error;
    }
  }

  async pushRank(data: z.infer<typeof FAQSchema>) {
    return await prisma.fAQ.update({
      where: { id: data.id },
      data: { position: data.position + 1 },
    });
  }

  async downRank(data: z.infer<typeof FAQSchema>) {
    return await prisma.fAQ.update({
      where: { id: data.id },
      data: { position: data.position - 1 },
    });
  }

  async deleteFaq(id: string) {
    try {
      return await prisma.fAQ.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du faq :', error);
      throw error;
    }
  }
}

const faqService = new FAQService();
export default faqService;
