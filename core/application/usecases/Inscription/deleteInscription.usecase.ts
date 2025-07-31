import { InscriptionRepository } from "@/core/domain/repositories/inscription.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export class DeleteInscriptionUseCase {
  constructor(private readonly repository: InscriptionRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      const normalizedError = ErrorHandler.normalize(error)
      ErrorHandler.log(normalizedError)
      throw normalizedError
    }
  }
} 