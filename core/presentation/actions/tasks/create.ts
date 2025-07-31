'use server';

import { revalidatePath } from 'next/cache';
import { CreateTaskUseCase } from '../../../application/usecases/Task/CreateTaskUseCase';
import { RepositoryFactory } from '../../../infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';

export const createTask = async (task: unknown) => {
  try {
    const taskRepository = RepositoryFactory.getTaskRepository();
    const createUseCase = new CreateTaskUseCase(taskRepository);
    const entity = await createUseCase.execute(task);
    revalidatePath('/dashboard');
    return entity.toObject();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
};
