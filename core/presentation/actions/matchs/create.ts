'use server';

import { revalidatePath } from 'next/cache';
import { CreateMatchUseCase } from '../../../application/usecases/Matchs/CreateMatchUseCase';
import { RepositoryFactory } from '../../../infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export async function createMatch(input: unknown) {
  try {
    const repository = RepositoryFactory.getMatchRepository();
    const teamRepository = RepositoryFactory.getTeamRepository();
    const createMatchUseCase = new CreateMatchUseCase(repository, teamRepository);
    const entity = await createMatchUseCase.execute(input);
    revalidatePath('/');
    revalidatePath('/plannings/matchs');
    return entity.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
