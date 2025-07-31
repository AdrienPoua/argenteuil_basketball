'use server';

import { revalidatePath } from 'next/cache';
import { UpsertTeamUseCase } from '../../../application/usecases/Team/UpsertTeamUseCase';
import { createClient } from '../../../infrastructure/supabase/clients/server';
import { SupabaseSessionRepository } from '../../../infrastructure/supabase/repositories/session.repository';
import { SupabaseTeamRepository } from '../../../infrastructure/supabase/repositories/team.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export async function upsert(data: unknown) {
  try {
    const client = await createClient();
    const sessionRepository = new SupabaseSessionRepository(client);
    const repository = new SupabaseTeamRepository(client, sessionRepository);
    const upsertUseCase = new UpsertTeamUseCase(repository);
    const entity = await upsertUseCase.execute(data);
    revalidatePath('/club/equipes');
    return entity.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
