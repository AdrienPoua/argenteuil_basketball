import { TeamEntity } from '../../../domain/entities/team.entity';
import { TeamRepository } from '../../../domain/repositories/team.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class FindTeamsByCoachUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(coachId: string): Promise<TeamEntity[]> {
    try {
      const teams = await this.teamRepository.findAllWithRelations();
      return teams
        .filter(
          (team) =>
            team.coachs.some((coach) => coach.id === coachId) ||
            team.assistantsCoach.some((coach) => coach.id === coachId),
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
