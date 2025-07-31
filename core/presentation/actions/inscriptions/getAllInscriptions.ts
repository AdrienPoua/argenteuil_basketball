'use server';

import { GetAllInscriptionsUseCase } from '@/core/application/usecases/Inscription/getAllInscriptions.usecase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function getAllInscriptions() {
  try {
    const repository = RepositoryFactory.getInscriptionRepository('browser');
    const getAllInscriptionsUseCase = new GetAllInscriptionsUseCase(repository);
    return await getAllInscriptionsUseCase.execute();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
