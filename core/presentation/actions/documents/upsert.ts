'use server';

import { revalidatePath } from 'next/cache';
import { UpsertDocumentUseCase } from '@/core/application/usecases/Document/UpsertDocumentUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function upsert(data: unknown) {
  try {
    const repository = RepositoryFactory.getDocumentRepository();
    const upsertUseCase = new UpsertDocumentUseCase(repository);
    const entity = await upsertUseCase.execute(data);
    revalidatePath('/documents');
    return entity.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
