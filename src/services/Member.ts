import { MemberSchema } from '@/lib/validation/Member';
import prisma from '@/database/prisma';
import { z } from 'zod';

class MemberService {
  private readonly createDataSchema = MemberSchema.omit({ id: true });

  async createMember(data: z.infer<typeof this.createDataSchema>) {
    const { teams, ...member } = data;

    try {
      return await prisma.member.create({
        data: {
          ...member,
          teams: {
            connect: teams.map((id) => ({
              id: id,
            })),
          },
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création du membre :', error);
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

  async getCoachs() {
    return await prisma.member.findMany({
      where: {
        teams: {
          some: {},
        },
      },
      include: {
        teams: true,
      },
    });
  }

  async getLeaders() {
    return await prisma.member.findMany({
      where: {
        isLeader: true,
      },
      include: {
        teams: true,
      },
    });
  }

  async updateMember(data: z.infer<typeof MemberSchema>) {
    const { id, teams, ...member } = data;

    return await prisma.member.update({
      where: { id: id },
      data: {
        ...member,
        teams: {
          set: teams.map((id) => ({
            id: id,
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
      console.error('Erreur lors de la suppression du membre :', error);
      throw error;
    }
  }
}

const memberService = new MemberService();
export default memberService;
