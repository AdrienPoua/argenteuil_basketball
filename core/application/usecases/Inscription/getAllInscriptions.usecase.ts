import { InscriptionRepository } from '../../../domain/repositories/inscription.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class GetAllInscriptionsUseCase {
  constructor(private readonly inscriptionRepository: InscriptionRepository) {}

  async execute() {
    try {
      const inscriptions = await this.inscriptionRepository.findAll()
      return inscriptions
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
