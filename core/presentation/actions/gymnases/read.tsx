"use server"

import { GetAllGymnasesUseCase } from "@/core/application/usecases/Gymnases/getAllGymnases"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function readGymnases() {
  try {
    const repository = RepositoryFactory.getGymnaseRepository("browser")
    const getAllGymnasesUseCase = new GetAllGymnasesUseCase(repository)
    return await getAllGymnasesUseCase.execute()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
