'use server'

import { revalidatePath } from 'next/cache'
import { UpdateDocumentUseCase } from '@/core/application/usecases/Document/UpdateDocumentUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export async function update(data: unknown) {
  try {
    const repository = RepositoryFactory.getDocumentRepository()
    const updateUseCase = new UpdateDocumentUseCase(repository)
    const entity = await updateUseCase.execute(data)
    revalidatePath('/documents')
    return entity.toObject()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
