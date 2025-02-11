'use server';
import TeamService from '@/services/Team';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { formSchema } from '../schemas/form.schemas';

const createTeamSchema = formSchema.extend({
  image: z.string().nullable(),
});

const updateTeamSchema = formSchema.extend({
  id: z.string(),
  image: z.string().nullable(),
});

export const createTeam = async (data: z.infer<typeof createTeamSchema>) => {
  await TeamService.createTeam({ ...data, image: data.image });
  revalidatePath('/dashboard/equipes');
};

export const updateTeam = async (data: z.infer<typeof updateTeamSchema>) => {
  console.log('🚀 ~ updateTeam ~ data:', data);
  await TeamService.updateTeam({ ...data, image: data.image });
  revalidatePath('/dashboard/equipes');
};

export const deleteTeam = async (id: string) => {
  await TeamService.deleteTeam(id);
  revalidatePath('/dashboard/equipes');
};
