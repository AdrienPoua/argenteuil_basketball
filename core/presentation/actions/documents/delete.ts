'use server';

import { revalidatePath } from 'next/cache';
import { DeleteDocumentUseCase } from '@/core/application/usecases/Document/DeleteDocumentUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export const deleteDocument = async (id: string) => {
  try {
    const documentRepository = RepositoryFactory.getDocumentRepository();
    const deleteDocumentUseCase = new DeleteDocumentUseCase(documentRepository);
    await deleteDocumentUseCase.execute(id);

    revalidatePath('/documents');
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
};
