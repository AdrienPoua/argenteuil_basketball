'use server'
import { revalidatePath } from 'next/cache'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export const deleteFaq = async (id: string) => {
  try {
    const faqRepository = RepositoryFactory.getFaqRepository()
    await faqRepository.delete(id)
    revalidatePath('/faq')
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
