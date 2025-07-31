import { MatchGateway } from '../../../domain/gateways/matchs'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class GetMatchFromExtranetUseCase {
  constructor(private readonly extranetClient: MatchGateway) {}

  async execute() {
    try {
      return await this.extranetClient.getMatchs()
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
