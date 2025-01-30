'use server';
import { TeamService } from '@/database/services/Team';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { formSchema } from '../schemas/form.schemas';

const teamService = new TeamService();

const createTeamSchema = formSchema.extend({
  image: z.string().nullable(),
});

const updateTeamSchema = formSchema.extend({
  id: z.string(),
  image: z.string().nullable(),
});

export const createTeam = async (data: z.infer<typeof createTeamSchema>) => {
  await teamService.createTeam({ ...data, image: data.image });
  revalidatePath('/dashboard/equipes');
};

export const updateTeam = async (data: z.infer<typeof updateTeamSchema>) => {
  console.log('🚀 ~ updateTeam ~ data:', data);
  await teamService.updateTeam({ ...data, image: data.image });
  revalidatePath('/dashboard/equipes');
};

export const deleteTeam = async (id: string) => {
  await teamService.deleteTeam(id);
  revalidatePath('/dashboard/equipes');
};
