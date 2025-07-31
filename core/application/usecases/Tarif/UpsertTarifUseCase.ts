import { z } from "zod"
import { TarifCategory, TarifEntity } from "../../../domain/entities/tarif.entity"
import { TarifRepository } from "../../../domain/repositories/tarif.repository"
import { CreateTarifDTO } from "../../../infrastructure/supabase/dtos/tarif.dto"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"
import { BaseUseCase } from "../BaseUseCase"

const UpsertTarifUseCaseInputSchema = z.object({
  id: z.string().optional(),
  price: z.number().min(0, "Le prix doit être positif"),
  min_age: z.number().min(0, "L'âge minimum doit être positif"),
  max_age: z.number().min(0, "L'âge maximum doit être positif"),
  category: z.nativeEnum(TarifCategory, {
    errorMap: () => ({ message: "Catégorie invalide" }),
  }),
  mutation_price: z.number().min(0, "Le prix de mutation doit être positif"),
  created_at: z.string().optional(),
})

export class UpsertTarifUseCase implements BaseUseCase<unknown, TarifEntity> {
  constructor(private readonly tarifRepository: TarifRepository) {}

  async execute(input: unknown): Promise<TarifEntity> {
    try {
      const data = UpsertTarifUseCaseInputSchema.parse(input)
      return await this.tarifRepository.upsert(data)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
