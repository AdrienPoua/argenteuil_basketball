'use server'

import { revalidatePath } from 'next/cache'
import { CreateDocumentUseCase } from '../../../application/usecases/Document/CreateDocumentUseCase'
import { RepositoryFactory } from '../../../infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export async function create(data: unknown) {
  try {
    const repository = RepositoryFactory.getDocumentRepository()
    const createUseCase = new CreateDocumentUseCase(repository)
    const entity = await createUseCase.execute(data)
    revalidatePath('/documents')
    return entity.toObject()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
