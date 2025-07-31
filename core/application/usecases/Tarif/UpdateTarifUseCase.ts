import { z } from 'zod'
import { TarifCategory, TarifEntity } from '../../../domain/entities/tarif.entity'
import { TarifRepository } from '../../../domain/repositories/tarif.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const UpdateTarifUseCaseInputSchema = z.object({
  id: z.string().uuid('ID invalide'),
  price: z.number().min(0, 'Le prix doit être positif').optional(),
  min_age: z.number().min(0, "L'âge minimum doit être positif").optional(),
  max_age: z.number().min(0, "L'âge maximum doit être positif").optional(),
  category: z
    .nativeEnum(TarifCategory, {
      errorMap: () => ({ message: 'Catégorie invalide' }),
    })
    .optional(),
  mutation_price: z.number().min(0, 'Le prix de mutation doit être positif').optional(),
})

type UpdateTarifUseCaseInput = z.infer<typeof UpdateTarifUseCaseInputSchema>

export class UpdateTarifUseCase implements BaseUseCase<UpdateTarifUseCaseInput, TarifEntity> {
  constructor(private readonly tarifRepository: TarifRepository) {}

  async execute(input: UpdateTarifUseCaseInput): Promise<TarifEntity> {
    try {
      const data = UpdateTarifUseCaseInputSchema.parse(input)
      return await this.tarifRepository.update(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
