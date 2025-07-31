import { MatchEntity } from '../../../domain/entities/match.entity';
import { MatchRepository } from '../../../domain/repositories/match.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class GetUpcomingMatchsUseCase {
  constructor(private readonly matchRepository: MatchRepository) {}
  async execute(): Promise<MatchEntity[]> {
    try {
      return await this.matchRepository.getUpcomingMatchs();
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
