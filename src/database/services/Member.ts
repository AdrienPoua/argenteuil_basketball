import {
  MemberSchema,
} from "@/database/schemas/Member";
import prisma from "@/database/prisma";
import { z } from "zod";
import { TeamSchema } from "@/database/schemas/Team";
export class MemberService {
  private readonly createDataSchema = MemberSchema.extend({
    teams: z.array(TeamSchema.merge(z.object({ id: z.string() }))),
  });
  private readonly updateDataSchema = MemberSchema.extend({
    id: z.string(),
    teams: z.array(TeamSchema.merge(z.object({ id: z.string() }))),
  });

  async createMember(data: z.infer<typeof this.createDataSchema>) {
    const { teams, ...member } = this.createDataSchema.parse(data);

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

  async updateMember(data: z.infer<typeof this.updateDataSchema>) {
    const { id, teams, ...member } = this.updateDataSchema.parse(data);

    return await prisma.member.update({
      where: { id },
      data: {
        ...member,
        teams: {
          set: teams.map((team) => ({
            id: team.id
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
