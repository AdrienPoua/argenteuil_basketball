'use server';

import { revalidatePath } from 'next/cache';
import { UpdateTeamUseCase } from '../../../application/usecases/Team/UpdateTeamUseCase';
import { RepositoryFactory } from '../../../infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export async function updateTeam(data: unknown) {
  try {
    const teamRepository = RepositoryFactory.getTeamRepository();
    const updateUseCase = new UpdateTeamUseCase(teamRepository);
    const team = await updateUseCase.execute(data);
    revalidatePath('/club/equipes');
    revalidatePath('/plannings/entrainements');
    return team.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
