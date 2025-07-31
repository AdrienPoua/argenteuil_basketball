"use server"
import { revalidatePath } from "next/cache"
import { DeleteMatchUseCase } from "@/core/application/usecases/Matchs/DeleteMatchUseCase"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export const deleteMatch = async (id: string) => {
  try {
    const matchRepository = RepositoryFactory.getMatchRepository()
    const deleteMatchUseCase = new DeleteMatchUseCase(matchRepository)
    await deleteMatchUseCase.execute(id)
    revalidatePath("/")
    revalidatePath("/plannings/matchs")
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
