"use server"

import { FindMemberByRoleUseCase } from "@/core/application/usecases/Member/FindMemberByRoleUseCase"
import { MemberRole } from "@/core/domain/entities/member.entity"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function readCoachs() {
  try {
    const repository = RepositoryFactory.getMemberRepository("browser")
    const getAllCoachsUseCase = new FindMemberByRoleUseCase(repository)
    return await getAllCoachsUseCase.execute(MemberRole.Coach)
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
