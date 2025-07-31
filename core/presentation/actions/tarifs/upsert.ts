'use server';

import { revalidatePath } from 'next/cache';
import { UpsertTarifUseCase } from '@/core/application/usecases/Tarif/UpsertTarifUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function upsertTarif(data: unknown) {
  try {
    const repository = RepositoryFactory.getTarifRepository();
    const upsertUseCase = new UpsertTarifUseCase(repository);
    const entity = await upsertUseCase.execute(data);
    revalidatePath('/admin/gestion/tarifs');
    revalidatePath('/adhesion/tarifs');
    return entity.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
