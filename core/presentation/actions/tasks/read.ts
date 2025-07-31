'use server ';

import { GetAllTasksUseCase } from '@/core/application/usecases/Task/GetAllTasksUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export const readTasks = async () => {
  try {
    const taskRepository = RepositoryFactory.getTaskRepository('browser');
    const getAllUseCase = new GetAllTasksUseCase(taskRepository);
    return await getAllUseCase.execute();
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
};
