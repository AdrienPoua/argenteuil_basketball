import { z } from 'zod'
import { TarifCategory, TarifEntity } from '../../../domain/entities/tarif.entity'
import { TarifRepository } from '../../../domain/repositories/tarif.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { BaseUseCase } from '../BaseUseCase'

const CreateTarifUseCaseInputSchema = z.object({
  price: z.number().min(0, 'Le prix doit être positif'),
  min_age: z.number().min(0, "L'âge minimum doit être positif"),
  max_age: z.number().min(0, "L'âge maximum doit être positif"),
  category: z.nativeEnum(TarifCategory, {
    errorMap: () => ({ message: 'Catégorie invalide' }),
  }),
  mutation_price: z.number().min(0, 'Le prix de mutation doit être positif'),
})

type CreateTarifUseCaseInput = z.infer<typeof CreateTarifUseCaseInputSchema>

export class CreateTarifUseCase implements BaseUseCase<CreateTarifUseCaseInput, TarifEntity> {
  constructor(private readonly tarifRepository: TarifRepository) {}

  async execute(input: CreateTarifUseCaseInput): Promise<TarifEntity> {
    try {
      const data = CreateTarifUseCaseInputSchema.parse(input)
      return await this.tarifRepository.create(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
