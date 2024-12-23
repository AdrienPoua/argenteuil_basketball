import { LeaderSchema, ExistingLeaderSchema } from "@/database/schemas/Leader";
import prisma from "@/database/prisma";
import { z } from "zod";

export class LeaderService {
  private readonly LeaderSchema = LeaderSchema;
  private readonly ExistingLeaderSchema = ExistingLeaderSchema;

  async createLeader(data: z.infer<typeof this.LeaderSchema>) {
    const leader = this.LeaderSchema.parse(data);
    try {
      return await prisma.leader.create({
        data: leader,
      });
    } catch (error) {
      console.error("Erreur lors de la création du leader :", error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getLeaders() {
    try {
      return await prisma.leader.findMany({});
    } catch (error) {
      console.error("Erreur lors de la récupération des leaders :", error);
      throw error;
    }
  }

  async updateLeader(data: z.infer<typeof this.ExistingLeaderSchema>) {
    const leader = this.ExistingLeaderSchema.parse(data);
    return await prisma.leader.update({
      where: { id: leader.id },
      data: leader
    });
  }

  async deleteLeader(id: string) {
    try {
      return await prisma.leader.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du leader :", error);
      throw error;
    }
  }
}
