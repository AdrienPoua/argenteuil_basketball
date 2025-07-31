'use server'

import { revalidatePath } from 'next/cache'
import { UpsertManyMatchsFromExtranetUseCase } from '@/core/application/usecases/Matchs/UpsertManyMatchsFromExtranetUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'
import { getMatchsFromExtranet } from './readFromExtranet'

export async function upsertFromExtranetToDatabase() {
  try {
    const Matchrepository = RepositoryFactory.getMatchRepository()
    const Teamrepository = RepositoryFactory.getTeamRepository()
    const upsertManyUseCase = new UpsertManyMatchsFromExtranetUseCase(
      Matchrepository,
      Teamrepository,
    )
    const matchs = await getMatchsFromExtranet()
    const entities = await upsertManyUseCase.execute(matchs)
    revalidatePath('/')
    revalidatePath('/plannings/matchs')
    return entities.map((match) => match.toObject())
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
