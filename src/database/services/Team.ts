import { TeamSchema } from "@/database/schemas/Team";
import prisma from "@/database/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export class TeamService {
  private readonly createTeamSchema = TeamSchema.extend({
    coach: z.string().optional(),
  });
  private readonly updateDataSchema = TeamSchema.extend({
    coach: z.string().optional(),
    id: z.string(),
  });
  // Création d'une équipe
  async createTeam(data: z.infer<typeof this.createTeamSchema>) {
    try {
      const { coach, ...team } = this.createTeamSchema.parse(data);
      console.log("🚀 ~ TeamService ~ createTeam ~ data:", data);
      await prisma.team.create({
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

  // Récupération de toutes les équipes
  async getTeams() {
    try {
      return await prisma.team.findMany({
        include: {
          coach: true,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      throw error;
    }
  }

  async updateTeam(data: Prisma.TeamUpdateInput) {
    const parsedTeam = this.updateDataSchema.parse(data);
    const { sessions, coach, id, ...team } = parsedTeam;

    try {
      return await prisma.team.update({
        where: { id },
        data: {
          ...team,
          coach: {
            connect: { id: coach },
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
