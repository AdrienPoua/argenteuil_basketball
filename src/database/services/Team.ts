import { TeamSchema } from "@/database/schemas/Team";
import { SessionSchema } from "@/database/schemas/Session";
import prisma from "@/database/prisma";
import { z } from "zod";
import { SessionService } from "./Session";

export class TeamService {
  private readonly SessionService = new SessionService();
  private readonly TeamSchema = TeamSchema;
  private readonly createTeamSchema = TeamSchema.extend({
    sessions: z.array(SessionSchema),
  });
  // Création d'une équipe
  async createTeam(data: z.infer<typeof this.createTeamSchema>) {
    try {
      const parsedTeam = this.createTeamSchema.parse(data);
      const { sessions, coachs, ...team } = parsedTeam;

      const createdSessions = await Promise.all(sessions.map((session) => this.SessionService.createSession(session)));

      // Créer l'équipe avec les sessions associées
      await prisma.team.create({
        data: {
          ...team,
          coachs: {
            connect: coachs.map((coach) => ({
              id: coach.id,
            })),
          },
          sessions: {
            connect: createdSessions.map((session) => ({
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
          coachs: true,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      throw error;
    }
  }

  async updateTeam(data: z.infer<typeof this.TeamSchema> & { id: string }) {
    const parsedTeam = this.TeamSchema.extend({ id: z.string() }).parse(data);
    const { sessions, coachs, ...team } = parsedTeam;

    try {
      return await prisma.team.update({
        where: { id: parsedTeam.id },
        data: {
          ...team,
          sessions: {
            set: sessions.map((session) => ({
              id: session.id,
            })),
          },
          coachs: {
            set: coachs.map((coach) => ({
              id: coach.id,
            })),
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
