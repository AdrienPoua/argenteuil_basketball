import { MemberSchema } from "@/database/schemas/Member";
import { TeamSchema } from "@/database/schemas/Team";
import { IdSchema } from "@/database/schemas/Id";
import prisma from "@/database/prisma";
import { z } from "zod";

export class MemberService {
  private readonly MemberSchema = MemberSchema.extend({
    teams: z.array(TeamSchema.merge(IdSchema)),
  });

  async createMember(data: z.infer<typeof MemberSchema>) {
    const { teams, ...member } = this.MemberSchema.parse(data);

    try {
      return await prisma.member.create({
        data: {
          ...member,
          teams: {
            connect: teams.map((team) => ({
              id: team.id,
            })),
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création du membre :", error);
      throw error;
    }
  }

  async getMembers() {
    return await prisma.member.findMany({
      include: {
        teams: true,
      },
    });
  }

  async updateMember(data: z.infer<typeof MemberSchema>) {
    const { id, teams, ...member } = this.MemberSchema.extend({
      id: z.string(),
    }).parse(data);

    return await prisma.member.update({
      where: { id },
      data: {
        ...member,
        teams: {
          set: teams.map((team) => ({
            id: team.id,
          })),
        },
      },
    });
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
