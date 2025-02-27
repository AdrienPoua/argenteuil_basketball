import prisma from '@/database/prisma';
import { z } from 'zod';
import { TeamSchema } from '@/lib/validation/Team';

class TeamService {
  private readonly createTeamSchema = TeamSchema.omit({ id: true, coach: true }).extend({
    coach: z.string().optional(),
  });
  async getTeams() {
    try {
      return await prisma.team.findMany({
        include: {
          coach: true,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des équipes :', error);
      throw error;
    }
  }

  async createTeam(data: z.infer<typeof this.createTeamSchema>) {
    const { coach, ...team } = data;
    try {
      return await prisma.team.create({
        data: {
          ...team,
          coach: coach ? { connect: { id: coach } } : undefined,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
      throw error;
    }
  }

  async updateTeam(team: z.infer<typeof TeamSchema>) {
    const { coach, ...teamData } = team;
    try {
      return await prisma.team.update({
        where: { id: team.id },
        data: {
          ...teamData,
          coach: {
            connect: { id: coach?.id },
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'équipe :", error);
      throw error;
    }
  }

  async deleteTeam(teamId: string) {
    try {
      return await prisma.team.delete({
        where: { id: teamId },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipe :", error);
      throw error;
    }
  }

  async getTeamByChampionnat(championnat: string) {
    return await prisma.team.findFirst({
      where: {
        championnats: {
          has: championnat,
        },
      },
      include: {
        coach: true,
      },
    });
  }
}

const teamService = new TeamService();
export default teamService;
