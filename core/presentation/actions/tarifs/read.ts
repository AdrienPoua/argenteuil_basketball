'use server';

import { GetAllTarifsUseCase } from '@/core/application/usecases/Tarif/GetAllTarifsUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function getAllTarifs() {
  try {
    const repository = RepositoryFactory.getTarifRepository('browser');
    const getAllUseCase = new GetAllTarifsUseCase(repository);
    const tarifs = await getAllUseCase.execute();
    return tarifs.map((tarif) => tarif.toObject());
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
