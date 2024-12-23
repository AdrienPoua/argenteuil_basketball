import { BaseTeamSchema, ExistingTeamSchema } from "@/database/schemas/Team";
import prisma from "@/database/prisma";
import { z } from "zod";

export class TeamService {
  private readonly BaseTeamSchema = BaseTeamSchema;
  private readonly ExistingTeamSchema = ExistingTeamSchema;

  // Création d'une équipe
  async createTeam(data: z.infer<typeof this.BaseTeamSchema>) {
    try {
      // Valider les données avec Zod
      const parsedTeam = this.BaseTeamSchema.parse(data);
      const { sessions, coach, ...team } = parsedTeam;

      // Créer l'équipe avec les sessions associées
      return await prisma.team.create({
        data: {
          ...team,
          coach: {
            connect: { id: coach?.id },
          },
          sessions: {
            connect: sessions.map((session) => ({
              id: session.id,
            })),
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getTeams() {
    try {
      return await prisma.team.findMany({
        include: {
          sessions: true,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      throw error;
    }
  }

  async updateTeam(data: z.infer<typeof this.ExistingTeamSchema>) {
    const parsedTeam = this.ExistingTeamSchema.parse(data);
    const { sessions, coach, ...team } = parsedTeam;

    try {
      return await prisma.team.update({
        where: { id: parsedTeam.id },
        include: {
          sessions: true,
          coach: true,
        },
        data: {
          ...team,
          sessions: {
            set: sessions.map((session) => ({
              id: session.id,
            })),
          },
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
}
