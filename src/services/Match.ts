import prisma from '@/database/prisma';
import { Prisma } from '@prisma/client';

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

  async updateMatch(match: Prisma.MatchUpdateInput & { id: string }) {
    const { id, date, salle, convocationIsSent } = match;
    return await prisma.match.update({
      where: { id },
      data: { date, salle, convocationIsSent },
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
