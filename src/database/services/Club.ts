import { z } from "zod";
import { ExistingClubSchema, BaseClubSchema } from "@/database/schemas/Club";
import prisma from "@/database/prisma";

export class ClubService {
  private readonly BaseClubSchema = BaseClubSchema;
  private readonly ExistingClubSchema = ExistingClubSchema;

  async createClub(data: z.infer<typeof this.BaseClubSchema>) {
    const { name, contact } = this.BaseClubSchema.parse(data);
    try {
      return await prisma.club.create({
        data: {
          name,
          contacts: {
            create: contact,
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création du club :", error);
      throw error;
    }
  }

  // Récupération de toutes les équipes
  async getClubs() {
    try {
      return await prisma.club.findMany();
    } catch (error) {
      console.error("Erreur lors de la récupération des clubs :", error);
      throw error;
    }
  }

  async updateClub(data: z.infer<typeof this.ExistingClubSchema>) {
    const { name, contact, id } = this.ExistingClubSchema.parse(data);
    return await prisma.club.update({
      where: { id: String(id) },
      data: {
        name,
        contacts: {
          set: contact.map((contact) => ({
            id: contact.id,
          })),
        },
      },
    });
  }

  async deleteClub(id: string) {
    try {
      return await prisma.club.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du club :", error);
      throw error;
    }
  }
}
