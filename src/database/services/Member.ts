import { MemberSchema } from "@/database/schemas/Member";
import prisma from "@/database/prisma";
import { z } from "zod";

export class MemberService {
  private readonly MemberSchema = MemberSchema;

  async createMember(data: z.infer<typeof this.MemberSchema>) {
    const member = this.MemberSchema.parse(data);
    try {
      if (data.teams.length > 0) {
        return await prisma.member.create({
          data: {
            ...member,
            coach: {
              create: {
                teams: {
                  connect: data.teams.map((team: { id: string }) => ({
                    id: team.id,
                  })),
                },
              },
            },
          },
        });
      } else {
        return await prisma.member.create({
          data: member,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création du membre :", error);
      throw error;
    }
  }
  async getCoachs() {
    try {
      return await prisma.coach.findMany({
        include: {
          teams: true,
          member: true,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des coachs :", error);
      throw error;
    }
  }

  async getLeaders() {
    return await prisma.member.findMany({
      where: { isLeader: true },
    });
  }

  async updateMember(data: z.infer<typeof this.MemberSchema> & { id: string }) {
    const member = this.MemberSchema.extend({
      id: z.string(),
      coachId: z.string().nullable(),
    }).parse(data);

    const { id, teams, coachId, ...memberData } = member; // Nettoie les champs inutiles

    if (teams.length > 0) {
      if (!coachId) {
        // Créer un Coach et associer des équipes
        return await prisma.member.update({
          where: { id },
          data: {
            ...memberData,
            coach: {
              create: {
                teams: {
                  connect: teams.map((team: { id: string }) => ({
                    id: team.id,
                  })),
                },
              },
            },
          },
        });
      } else {
        // Mettre à jour les équipes d'un Coach existant
        return await prisma.member.update({
          where: { id },
          data: {
            ...memberData,
            coach: {
              update: {
                teams: {
                  set: teams.map((team: { id: string }) => ({ id: team.id })),
                },
              },
            },
          },
        });
      }
    } else {
      if (coachId) {
        // Supprime le Coach si aucune équipe n'est associée
        await prisma.coach.delete({
          where: { id: coachId },
        });
      }
      // Met à jour uniquement le Member
      return await prisma.member.update({
        where: { id },
        data: memberData,
      });
    }
  }

  async deleteMember(id: string) {
    try {
      await prisma.member.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du membre :", error);
      throw error;
    }
  }
}
