'use server';

import { GetMatchFromExtranetUseCase } from '@/core/application/usecases/Matchs/GetMatchFromExtranetUseCase';
import { Match } from '@/core/domain/gateways/matchs';
import { ExtranetClient } from '@/core/infrastructure/extranet/client';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function getMatchsFromExtranet(): Promise<Match[]> {
  try {
    const client = ExtranetClient.getClient();
    const getAllUseCase = new GetMatchFromExtranetUseCase(client);
    return await getAllUseCase.execute();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
