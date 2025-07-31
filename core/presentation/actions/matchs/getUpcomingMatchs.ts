'use server';

import { GetUpcomingMatchsUseCase } from '@/core/application/usecases/Matchs/GetUpcomingMatchsUseCase';
import { toPersistence } from '@/core/infrastructure/supabase/mappers/match.mapper';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function getUpcomingMatchs() {
  try {
    const repository = RepositoryFactory.getMatchRepository('browser');
    const getUpcomingMatchsUseCase = new GetUpcomingMatchsUseCase(repository);
    const matchs = await getUpcomingMatchsUseCase.execute();
    return matchs.map((match) => toPersistence(match));
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
