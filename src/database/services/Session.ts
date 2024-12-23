import {
  SessionSchema,
  ExistingSessionSchema,
} from "@/database/schemas/Session";
import prisma from "@/database/prisma";
import { z } from "zod";

export class SessionService {
  private readonly SessionSchema = SessionSchema;
  private readonly ExistingSessionSchema = ExistingSessionSchema;

  async createSession(data: z.infer<typeof this.SessionSchema>) {
    const { assignedTeams, ...session } = this.SessionSchema.parse(data);
    try {
      return await prisma.session.create({
        data: {
          ...session,
          assignedTeams: {
            connect: assignedTeams.map((team) => ({
              id: team.id,
            })),
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création du session :", error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getSessions() {
    try {
      return await prisma.session.findMany({});
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions :", error);
      throw error;
    }
  }

  async updateSession(data: z.infer<typeof this.ExistingSessionSchema>) {
    const { assignedTeams, ...session } = this.ExistingSessionSchema.parse(data);
    try {
      return await prisma.session.update({
        where: { id: session.id },
        data: {
          ...session,
          assignedTeams: {
            set: assignedTeams.map((team: { id: string }) => ({
              id: team.id,
            })),
          },
        },
        include: {
          assignedTeams: true,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du session :", error);
      throw error;
    }
  }

  async deleteSession(id: string) {
    try {
      return await prisma.session.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du session :", error);
      throw error;
    }
  }
}
