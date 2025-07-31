"use server"

import { GetAllMatchsUseCase } from "@/core/application/usecases/Matchs/GetAllMatchsUseCase"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function readMatchs() {
  try {
    const repository = RepositoryFactory.getMatchRepository("browser")
    const getAllMatchsUseCase = new GetAllMatchsUseCase(repository)
    return await getAllMatchsUseCase.execute()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
