'use server'

import { FindDirigeantsUseCase } from '@/core/application/usecases/Member/FindDirigeantsUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export async function readDirigeants() {
  try {
    const repository = RepositoryFactory.getMemberRepository('browser')
    const getAllDirigeantsUseCase = new FindDirigeantsUseCase(repository)
    return await getAllDirigeantsUseCase.execute()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
