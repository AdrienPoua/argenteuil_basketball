import { DeleteMatchUseCase } from './DeleteMatchUseCase';
import { GetAllMatchsUseCase } from './GetAllMatchsUseCase';
import { GetMatchFromExtranetUseCase } from './GetMatchFromExtranetUseCase';
import { MatchEntity } from '../../../domain/entities/match.entity';
import { MatchRepository } from '../../../domain/repositories/match.repository';
import { ExtranetClient as ExtranetRepository } from '../../../infrastructure/extranet/client';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export class RemoveOldMatchsUseCase {
  constructor(
    private readonly repositoryForDatabase: MatchRepository,
    private readonly clientForExtranet: ExtranetRepository,
  ) {}
  async execute(): Promise<void> {
    try {
      // get repository and client
      const repositoryForDatabase = this.repositoryForDatabase;
      const clientForExtranet = this.clientForExtranet;
      // get use cases
      const databaseUseCase = new GetAllMatchsUseCase(repositoryForDatabase);
      const deleteMatchUseCase = new DeleteMatchUseCase(repositoryForDatabase);
      const extranetUseCase = new GetMatchFromExtranetUseCase(clientForExtranet);
      // get matchs
      const matchsFromDatabase = await databaseUseCase.execute();
      const matchsFromExtranet = await extranetUseCase.execute();
      // get alls matchs ids that are in the database but not in the extranet, but are not amical matchs
      const filterFn = (match: MatchEntity) => {
        const isAmical = match.isAmical;
        const isInExtranet = matchsFromExtranet.some((extranetMatch) => extranetMatch.id.toString() === match.id);
        return !isInExtranet && !isAmical;
      };
      // filter matchs
      const matchsIdsToDelete = matchsFromDatabase.filter(filterFn).map((match) => match.id);

      await Promise.all(matchsIdsToDelete.map((id) => deleteMatchUseCase.execute(id)));
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
