'use server';

import { ExtranetClient } from '@/core/infrastructure/extranet/client';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export const getCompetitions = async () => {
  try {
    const client = ExtranetClient.getClient();
    return await client.getCompetitions();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    return [];
  }
};
