import { z } from "zod"
import { TarifRepository } from "../../../domain/repositories/tarif.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"
import { BaseUseCase } from "../BaseUseCase"

const DeleteTarifUseCaseInputSchema = z.string().uuid("ID invalide")

export class DeleteTarifUseCase implements BaseUseCase<string, void> {
  constructor(private readonly tarifRepository: TarifRepository) {}

  async execute(id: string): Promise<void> {
    try {
      const validId = DeleteTarifUseCaseInputSchema.parse(id)
      await this.tarifRepository.delete(validId)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}