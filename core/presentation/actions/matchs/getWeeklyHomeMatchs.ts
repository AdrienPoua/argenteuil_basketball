'use server';

import { GetWeeklyHomeMatchsUseCase } from '@/core/application/usecases/Matchs/GetWeeklyHomeMatchs';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function getWeeklyHomeMatchs() {
  try {
    const repository = RepositoryFactory.getMatchRepository('browser');
    const getWeeklyHomeMatchsUseCase = new GetWeeklyHomeMatchsUseCase(repository);
    return await getWeeklyHomeMatchsUseCase.execute();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
