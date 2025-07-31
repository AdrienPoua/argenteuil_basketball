'use server'

import { revalidatePath } from 'next/cache'
import { UpsertFaqUseCase } from '@/core/application/usecases/Faq/UpsertFaqUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export async function upsert(data: unknown) {
  try {
    const repository = RepositoryFactory.getFaqRepository()
    const upsertUseCase = new UpsertFaqUseCase(repository)
    const entity = await upsertUseCase.execute(data)
    revalidatePath('/faq')
    return entity.toObject()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
