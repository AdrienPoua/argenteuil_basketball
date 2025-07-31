import { TeamEntity } from '../../../domain/entities/team.entity'
import { TeamRepository } from '../../../domain/repositories/team.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class GetAllTeamsUseCase {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(): Promise<TeamEntity[]> {
    try {
      const teams = await this.teamRepository.findAllWithRelations()
      return teams.sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
