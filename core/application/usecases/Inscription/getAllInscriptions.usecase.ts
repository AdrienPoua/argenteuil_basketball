import { InscriptionEntity } from '../../../domain/entities/inscription.entity';
import { InscriptionRepository } from '../../../domain/repositories/inscription.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class GetAllInscriptionsUseCase {
  constructor(private readonly inscriptionRepository: InscriptionRepository) {}

  async execute(): Promise<InscriptionEntity[]> {
    try {
      return await this.inscriptionRepository.findAll();
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
