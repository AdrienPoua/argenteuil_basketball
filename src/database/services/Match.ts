"use server";

import { z } from "zod";
import { BaseMatchSchema, ExistingMatchSchema, upsertMatchSchema } from "@/database/schemas/Match";
import prisma from "@/database/prisma";

export class MatchService {
  private readonly BaseMatchSchema = BaseMatchSchema;
  private readonly ExistingMatchSchema = ExistingMatchSchema;
  private readonly upsertMatchSchema = upsertMatchSchema;

  async createMatch(data: z.infer<typeof this.BaseMatchSchema>) {
    try {
      const parsedMatch = this.BaseMatchSchema.parse(data);
      return await prisma.match.create({
        data: parsedMatch,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getMatchs() {
    try {
      return await prisma.match.findMany();
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      throw error;
    }
  }

  async updateMatch(data: z.infer<typeof this.ExistingMatchSchema>) {
    const parsedMatch = this.ExistingMatchSchema.parse(data);
    try {
      return await prisma.match.update({
        where: { id: parsedMatch.id },
        data: {
          joue: parsedMatch.joue,
          remise: parsedMatch.remise,
          forfaitEquipe1: parsedMatch.forfaitEquipe1,
          forfaitEquipe2: parsedMatch.forfaitEquipe2,
          resultatEquipe1: parsedMatch.resultatEquipe1,
          resultatEquipe2: parsedMatch.resultatEquipe2,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du match :", error);
      throw error;
    }
  }

  async upsertMatch(data: unknown) {
    const parsedMatch = this.upsertMatchSchema.parse(data);
    return await prisma.match.upsert({
      where: { id: parsedMatch.id },
      update: {
        joue: parsedMatch.joue,
        remise: parsedMatch.remise,
        forfaitEquipe1: parsedMatch.forfaitEquipe1,
        forfaitEquipe2: parsedMatch.forfaitEquipe2,
        resultatEquipe1: parsedMatch.resultatEquipe1,
        resultatEquipe2: parsedMatch.resultatEquipe2,
      },
      create: parsedMatch,
    });
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
