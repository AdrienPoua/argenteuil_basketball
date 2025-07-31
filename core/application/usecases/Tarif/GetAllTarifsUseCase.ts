import { TarifEntity } from '../../../domain/entities/tarif.entity';
import { TarifRepository } from '../../../domain/repositories/tarif.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class GetAllTarifsUseCase {
  constructor(private readonly tarifRepository: TarifRepository) {}

  async execute(): Promise<TarifEntity[]> {
    try {
      const tarifs = await this.tarifRepository.findAll();
      return tarifs.sort((a, b) => a.max_age - b.max_age);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
