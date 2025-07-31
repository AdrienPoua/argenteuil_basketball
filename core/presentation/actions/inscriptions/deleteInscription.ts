'use server'
import { revalidatePath } from 'next/cache'
import { DeleteInscriptionUseCase } from '@/core/application/usecases/Inscription/deleteInscription.usecase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export async function deleteInscription(id: string) {
  try {
    const repository = RepositoryFactory.getInscriptionRepository()
    const usecase = new DeleteInscriptionUseCase(repository)
    await usecase.execute(id)
    revalidatePath('/admin/inscriptions/pre-inscriptions')
    return { success: true }
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
