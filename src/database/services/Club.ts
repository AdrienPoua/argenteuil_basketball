import { z } from 'zod';
import { ClubSchema } from '@/database/schemas/Club';
import prisma from '@/database/prisma';

export class ClubService {
  private readonly ClubSchema = ClubSchema;

  async createClub(data: z.infer<typeof this.ClubSchema>) {
    const club = this.ClubSchema.parse(data);
    try {
      return await prisma.club.create({
        data: club,
      });
    } catch (error) {
      console.error('Erreur lors de la création du club :', error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getClubs() {
    try {
      return await prisma.club.findMany();
    } catch (error) {
      console.error('Erreur lors de la récupération des clubs :', error);
      throw error;
    }
  }

  async upsert(data: z.infer<typeof this.ClubSchema>) {
    const { id, ...club } = this.ClubSchema.parse(data);
    console.log('🚀 ~ ClubService ~ upsert ~ club:', club);
    return await prisma.club.upsert({
      where: { id: id },
      update: { ...club },
      create: { ...club, id: id },
    });
  }

  async updateClub(data: z.infer<typeof this.ClubSchema> & { id: string }) {
    const { id, ...club } = this.ClubSchema.extend({ id: z.string() }).parse(data);
    return await prisma.club.update({
      where: { id: id },
      data: club,
    });
  }

  async deleteClub(id: string) {
    try {
      return await prisma.club.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du club :', error);
      throw error;
    }
  }

  async deleteAll() {
    return await prisma.club.deleteMany();
  }
}
