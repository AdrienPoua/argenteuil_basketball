'use server'

import { FindMembersUseCase } from '@/core/application/usecases/Member/findMemberUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

export async function readMembers() {
  try {
    const repository = RepositoryFactory.getMemberRepository('browser')
    const getAllMembersUseCase = new FindMembersUseCase(repository)
    return await getAllMembersUseCase.execute()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
