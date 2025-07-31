"use server"
import { revalidatePath } from "next/cache"
import { CreateInscriptionUseCase } from "@/core/application/usecases/Inscription/createInscription.usecase"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function createInscription(data: unknown) {
  try {
    const repository = RepositoryFactory.getInscriptionRepository()
    const createInscriptionUseCase = new CreateInscriptionUseCase(repository)
    await createInscriptionUseCase.execute(data)
    revalidatePath("/admin/inscriptions/pre-inscriptions")
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
