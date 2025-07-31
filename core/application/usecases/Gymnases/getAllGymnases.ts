import { GymnaseEntity } from '../../../domain/entities/gymnase.entity'
import { GymnaseRepository } from '../../../domain/repositories/gymnase.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class GetAllGymnasesUseCase {
  constructor(private readonly gymnaseRepository: GymnaseRepository) {}
  async execute(): Promise<GymnaseEntity[]> {
    try {
      return await this.gymnaseRepository.findAll()
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
