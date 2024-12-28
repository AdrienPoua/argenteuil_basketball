import { TeamSchema } from "@/database/schemas/Team";
import prisma from "@/database/prisma";
import { Prisma } from "@prisma/client";
import { SessionService } from "./Session";
import { IdSchema } from "@/database/schemas/Id";
import { z } from "zod";

export class TeamService {
  private readonly SessionService = new SessionService();
  private readonly TeamSchema = TeamSchema.merge(IdSchema);
  // Création d'une équipe
  async createTeam(data: z.infer<typeof TeamSchema>) {
    try {
      const parsedTeam = this.TeamSchema.parse(data);
      const { sessions, coach, ...team } = parsedTeam;

      const createdSessions = await Promise.all(
        sessions.map((session) => this.SessionService.createSession(session)),
      );

      // Créer l'équipe avec les sessions associées
      await prisma.team.create({
        data: {
          ...team,
          sessions: {
            connect: createdSessions.map((session) => ({
              id: session.id,
            })),
          },
          coach: {
            connect: { id: coach?.id },
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
          sessions: {
            include: {
              session: true,
            },
          },
          coach: true,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      throw error;
    }
  }

  async updateTeam(data: Prisma.TeamUpdateInput) {
    const parsedTeam = this.TeamSchema.parse(data);
    const { sessions, coach, id, ...team } = parsedTeam;

    try {
      return await prisma.team.update({
        where: { id },
        data: {
          ...team,
          sessions: {
            connect: sessions.map((session) => ({
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
