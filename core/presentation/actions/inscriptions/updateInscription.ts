'use server';
import { revalidatePath } from 'next/cache';
import { UpdateInscriptionUseCase } from '@/core/application/usecases/Inscription/updateInscription.usecase';
import { InscriptionDTO } from '@/core/infrastructure/supabase/dtos/inscription.dto';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function updateInscription(id: string, data: Partial<InscriptionDTO>) {
  try {
    const payload = { id, ...data };
    const repository = RepositoryFactory.getInscriptionRepository();
    const usecase = new UpdateInscriptionUseCase(repository);
    await usecase.execute(payload);
    revalidatePath('/admin/inscriptions/pre-inscriptions');
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
