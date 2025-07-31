'use server';

import { GetAllMembersUseCase } from '@/core/application/usecases/Member/GetAllMembersUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export async function readMembers() {
  try {
    const repository = RepositoryFactory.getMemberRepository('browser');
    const getAllMembersUseCase = new GetAllMembersUseCase(repository);
    return await getAllMembersUseCase.execute();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
}
