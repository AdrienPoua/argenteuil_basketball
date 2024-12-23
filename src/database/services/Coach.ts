import { CoachSchema, ExistingCoachSchema } from "@/database/schemas/Coach";
import prisma from "@/database/prisma";
import { z } from "zod";

export class CoachService {
  private readonly CoachSchema = CoachSchema;
  private readonly ExistingCoachSchema = ExistingCoachSchema;

  async createCoach(data: z.infer<typeof this.CoachSchema>) {
    const coach = this.CoachSchema.parse(data);
    try {
      return await prisma.coach.create({
        data: {
          ...coach,
          teams: {
            connect: coach.teams.map((team: { id: string }) => ({
              id: team.id,
            })),
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création du coach :", error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getCoachs() {
    try {
      return await prisma.coach.findMany({
        include: {
          teams: true,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des coachs :", error);
      throw error;
    }
  }

  async updateCoach(data: z.infer<typeof this.ExistingCoachSchema>) {
    const coach = this.ExistingCoachSchema.parse(data);
    return await prisma.coach.update({
      where: { id: coach.id },
      data: {
        ...coach,
        teams: {
          set: coach.teams.map((team: { id: string }) => ({ id: team.id })),
        },
      },
    });
  }

  async deleteCoach(id: string) {
    try {
      return await prisma.coach.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du coach :", error);
      throw error;
    }
  }
}
