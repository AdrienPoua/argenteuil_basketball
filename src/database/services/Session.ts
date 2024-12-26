import { SessionSchema } from "@/database/schemas/Session";
import prisma from "@/database/prisma";
import { z } from "zod";

export class SessionService {
  private readonly SessionSchema = SessionSchema;

  async createSession(data: z.infer<typeof this.SessionSchema>) {
    const { teams, ...session } = this.SessionSchema.parse(data);
    try {
      return await prisma.session.create({
        data: {
          ...session,
          teams: {
            connect: teams.map((team) => ({
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

  async updateSession(data: z.infer<typeof this.SessionSchema> & { id: string }) {
    const { teams, ...session } = this.SessionSchema.extend({ id: z.string() }).parse(data);
    try {
      return await prisma.session.update({
        where: { id: session.id },
        data: {
          ...session,
          teams: {
            set: teams.map((team: { id: string }) => ({
              id: team.id,
            })),
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du session :", error);
      throw error;
    }
  }

  async deleteSession(id: string) {
    try {
      await prisma.session.delete({
        where: { id: id },
      });
      await prisma.teamOnSession.deleteMany({
        where: { sessionId: id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du session :", error);
      throw error;
    }
  }
}
