import { MatchRepository } from "../../../domain/repositories/match.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"

export class DeleteMatchUseCase {
  constructor(private readonly matchRepository: MatchRepository) {}
  async execute(id: string): Promise<void> {
    try {
      await this.matchRepository.delete(id)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
