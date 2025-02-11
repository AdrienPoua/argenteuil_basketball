import { z } from 'zod';
import { ClubSchema } from '@/lib/validation/Club';
import prisma from '@/database/prisma';

class ClubService {
  async createClub(club: z.infer<typeof ClubSchema>) {
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

  async getClub(id: string) {
    try {
      return await prisma.club.findUnique({ where: { id: id } });
    } catch (error) {
      console.error('Erreur lors de la récupération du club :', error);
      throw error;
    }
  }

  async upsert(club: z.infer<typeof ClubSchema>) {
    const { id, ...rest } = club;
    return await prisma.club.upsert({
      where: { id: id },
      update: { ...rest },
      create: { ...rest, id: id },
    });
  }

  async updateClub(club: z.infer<typeof ClubSchema>) {
    const { id, ...rest } = club;
    return await prisma.club.update({
      where: { id: id },
      data: rest,
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

  async createClubs(clubs: z.infer<typeof ClubSchema>[]) {
    return await prisma.club.createMany({
      data: clubs,
    });
  }
}

const clubService = new ClubService();
export default clubService;
