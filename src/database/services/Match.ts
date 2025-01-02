import { z } from "zod";
import {
  BaseMatchSchema,
} from "@/database/schemas/Match";
import prisma from "@/database/prisma";

export class MatchService {
  private readonly upsertMatchSchema = BaseMatchSchema.extend({
    id: z.string(),
  });

  // Récupération de toutes les équipes
  async getMatchs() {
    try {
      return await prisma.match.findMany();
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      throw error;
    }
  }

  async upsert(data: unknown) {
    const { success, data: match } = this.upsertMatchSchema.safeParse(data);
    if (!success) return;
    const updatePayload = {
      joue: match.joue,
      remise: match.remise,
      forfaitEquipe1: match.forfaitEquipe1,
      forfaitEquipe2: match.forfaitEquipe2,
      resultatEquipe1: match.resultatEquipe1,
      resultatEquipe2: match.resultatEquipe2,
    };
    const result = await prisma.match.upsert({
      where: { id: match.id },
      update: updatePayload,
      create: {
        ...match,
        id: match.id,
      },
    });
    console.log("🚀 ~ MatchService ~ upsert ~ result:", result)
    return result;
  }

  async deleteMatch(matchId: string) {
    try {
      return await prisma.match.delete({
        where: { id: matchId },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du match :", error);
      throw error;
    }
  }
}
