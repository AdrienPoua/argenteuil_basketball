"use server"

import { revalidatePath } from "next/cache"
import { UpdateMatchUseCase } from "@/core/application/usecases/Matchs/UpdateMatchUseCase"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function updateMatch(input: unknown) {
  try {
    const repository = RepositoryFactory.getMatchRepository()
    const updateMatchUseCase = new UpdateMatchUseCase(repository)
    const entity = await updateMatchUseCase.execute(input)
    revalidatePath("/")
    revalidatePath("/plannings/matchs")
    return entity.toObject()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
