import { MatchEntity } from '../../../domain/entities/match.entity';
import { MatchRepository } from '../../../domain/repositories/match.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class GetWeeklyHomeMatchsUseCase {
  constructor(private readonly matchRepository: MatchRepository) {}
  async execute(): Promise<MatchEntity[]> {
    try {
      return await this.matchRepository.getWeeklyHomeMatch();
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
