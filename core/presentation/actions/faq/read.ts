'use server'

import { GetAllFaqsUseCase } from '@/core/application/usecases/Faq/GetAllFaqsUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export async function readFaqs() {
  try {
    const repository = RepositoryFactory.getFaqRepository('browser')
    const getAllFaqsUseCase = new GetAllFaqsUseCase(repository)
    return await getAllFaqsUseCase.execute()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
