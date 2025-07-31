'use server';
import { revalidatePath } from 'next/cache';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export const deleteTask = async (id: string) => {
  try {
    const taskRepository = RepositoryFactory.getTaskRepository();
    await taskRepository.delete(id);
    revalidatePath('/dashboard');
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
};
