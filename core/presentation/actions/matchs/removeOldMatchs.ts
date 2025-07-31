"use server"
import { revalidatePath } from "next/cache"
import { RemoveOldMatchsUseCase } from "@/core/application/usecases/Matchs/RemoveOldMatchs"
import { ExtranetClient as ExtranetRepository } from "@/core/infrastructure/extranet/client"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export const removeOldMatchs = async () => {
  try {
    const matchRepository = RepositoryFactory.getMatchRepository()
    const extranetClient = ExtranetRepository.getClient()
    const removeOldMatchsUseCase = new RemoveOldMatchsUseCase(matchRepository, extranetClient)
    await removeOldMatchsUseCase.execute()
    revalidatePath("/")
    revalidatePath("/plannings/matchs")
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
