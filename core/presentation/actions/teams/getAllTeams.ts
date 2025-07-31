'use server';

import { GetAllTeamsUseCase } from '../../../application/usecases/Team/GetAllTeamsUseCase';
import { TeamEntity } from '../../../domain/entities/team.entity';
import { RepositoryFactory } from '../../../infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export async function readTeams(): Promise<TeamEntity[]> {
  try {
    const teamRepository = RepositoryFactory.getTeamRepository('browser');
    const getAllUseCase = new GetAllTeamsUseCase(teamRepository);
    return await getAllUseCase.execute();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
