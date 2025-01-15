import { z } from "zod";
import { BaseMatchSchema } from "@/database/schemas/Match";
import prisma from "@/database/prisma";
import { Prisma } from "@prisma/client";

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

  async validateMatchBeforeUpsert(data: unknown) {
    const { success, data: match } = BaseMatchSchema.extend({
      id: z.number(),
      competition: z.string().optional(),
      correspondant: z.string().optional(),
    }).safeParse(data);

    if (!success) return null
    return match;
  }

  async updateMatch(match: Prisma.MatchUpdateInput & { id: string }) {
    const { id, date, salle, convocationIsSent } = match;
    return await prisma.match.update({
      where: { id },
      data: { date, salle, convocationIsSent },
    });
  }

  async upsert(data: unknown) {
    const match = this.upsertMatchSchema.parse(data);
    const updatePayload = {
      joue: match.joue,
      remise: match.remise,
      forfaitEquipe1: match.forfaitEquipe1,
      forfaitEquipe2: match.forfaitEquipe2,
      resultatEquipe1: match.resultatEquipe1,
      resultatEquipe2: match.resultatEquipe2,
      correspondant: match.correspondant,
      convocationIsSent: match.convocationIsSent,
    };
    const result = await prisma.match.upsert({
      where: { id: match.id },
      update: updatePayload,
      create: {
        ...match,
        id: match.id,
      },
    });
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
