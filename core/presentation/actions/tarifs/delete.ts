'use server';

import { revalidatePath } from 'next/cache';
import { DeleteTarifUseCase } from '@/core/application/usecases/Tarif/DeleteTarifUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function deleteTarif(id: string) {
  try {
    const repository = RepositoryFactory.getTarifRepository();
    const deleteUseCase = new DeleteTarifUseCase(repository);
    await deleteUseCase.execute(id);
    revalidatePath('/admin/gestion/tarifs');
    revalidatePath('/adhesion/tarifs');
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
