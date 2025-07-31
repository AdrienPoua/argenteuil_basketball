'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UpdateTarifUseCase } from '@/core/application/usecases/Tarif/UpdateTarifUseCase'
import { TarifCategory } from '@/core/domain/entities/tarif.entity'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

const UpdateTarifUseCaseSchema = z.object({
  id: z.string().uuid('ID invalide'),
  price: z.number().min(0, 'Le prix doit être positif'),
  min_age: z.number().min(0, "L'âge minimum doit être positif"),
  max_age: z.number().min(0, "L'âge maximum doit être positif"),
  category: z.nativeEnum(TarifCategory, {
    errorMap: () => ({ message: 'Catégorie invalide' }),
  }),
  mutation_price: z.number().min(0, 'Le prix de mutation doit être positif'),
})

export async function updateTarif(input: unknown) {
  try {
    const data = UpdateTarifUseCaseSchema.parse(input)
    const repository = RepositoryFactory.getTarifRepository()
    const updateUseCase = new UpdateTarifUseCase(repository)
    const entity = await updateUseCase.execute(data)
    revalidatePath('/admin/gestion/tarifs')
    revalidatePath('/inscriptions/tarifs')
    return entity.toObject()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
