'use server'

import { revalidatePath } from 'next/cache'
import { CreateTeamUseCase } from '../../../application/usecases/Team/CreateTeamUseCase'
import { RepositoryFactory } from '../../../infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'
import { uploadFile } from '../../../shared/utils/upload'

export async function createTeam(data: {
  name: string
  category: string[]
  gender: string
  level: string
  coachsIds: string[]
  assistantsCoachIds: string[]
  competitions: { id: number; label: string; poules: { id: number; nom: string }[] }[]
  sessions: {
    day: string
    start: string
    end: string
    gymnase_id: string
    created_at: string
  }[]
  file?: File
  imageUrl?: string
}) {
  try {
    let imageUrl = data.imageUrl

    // Si un nouveau fichier est fourni, l'uploader
    if (data.file) {
      imageUrl = await uploadFile(data.file, 'teams', 'logos')
    }

    const teamData = {
      ...data,
      image: imageUrl,
    }

    const teamRepository = RepositoryFactory.getTeamRepository('browser')
    const createUseCase = new CreateTeamUseCase(teamRepository)
    const entity = await createUseCase.execute(teamData)

    revalidatePath('/')
    return entity.toObject()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
