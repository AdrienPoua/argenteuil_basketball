"use server"
import { revalidatePath } from "next/cache"
import { DeleteMemberUseCase } from "@/core/application/usecases/Member/DeleteMemberUseCase"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function deleteMember(id: string): Promise<void> {
  try {
    const memberRepository = RepositoryFactory.getMemberRepository()
    const deleteUseCase = new DeleteMemberUseCase(memberRepository)
    await deleteUseCase.execute(id)
    revalidatePath("/club/dirigeants")
    revalidatePath("/club/entraineurs")
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
