import prisma from '@/database/prisma';
import { Prisma } from '@prisma/client';
import { argenteuilIdOrganisme } from '@/lib/constants/argenteuil-id-organisme';
class MatchService {
  // Récupération de toutes les matchs
  async getMatchs() {
    try {
      return await prisma.match.findMany();
    } catch (error) {
      console.error('Erreur lors de la récupération des équipes :', error);
      throw error;
    }
  }

  async createMatch(match: Prisma.MatchCreateInput) {
    try {
      return await prisma.match.create({
        data: match,
      });
    } catch (error) {
      console.error('Erreur lors de la création du match :', error);
      throw error;
    }
  }

  async getWeeklyHomeMatch() {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() || 7) + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
    endOfWeek.setHours(23, 59, 59, 999);

    return await prisma.match.findMany({
      where: {
        date: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
        idOrganismeEquipe1: argenteuilIdOrganisme,
      },
      orderBy: {
        date: 'asc'
      }
    });
  }

  async updateMatch(match: Prisma.MatchUpdateInput & { id: string }) {
    const { id, ...rest } = match;
    return await prisma.match.update({
      where: { id },
      data: rest,
    });
  }

  async upsert(match: Prisma.MatchCreateInput) {
    const updatePayload = {
      joue: match.joue,
      remise: match.remise,
      forfaitEquipe1: match.forfaitEquipe1,
      forfaitEquipe2: match.forfaitEquipe2,
      resultatEquipe1: match.resultatEquipe1,
      resultatEquipe2: match.resultatEquipe2,
      correspondant: match.correspondant,
    };

    return await prisma.match.upsert({
      where: { id: match.id.toString() },
      update: updatePayload,
      create: {
        ...match,
        id: match.id.toString(),
      },
    });
  }

  async deleteMatch(matchId: string) {
    try {
      return await prisma.match.delete({
        where: { id: matchId },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du match :', error);
      throw error;
    }
  }
}

const matchService = new MatchService();
export default matchService;
