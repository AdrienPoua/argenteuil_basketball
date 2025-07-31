'use server'

import { GetAllDocumentsUseCase } from '@/core/application/usecases/Document/ReadDocumentUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export async function readDocuments() {
  try {
    const repository = RepositoryFactory.getDocumentRepository('browser')
    const getAllDocumentsUseCase = new GetAllDocumentsUseCase(repository)
    return await getAllDocumentsUseCase.execute()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
