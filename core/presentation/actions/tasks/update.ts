'use server'

import { revalidatePath } from 'next/cache'
import { UpdateTaskUseCase } from '../../../application/usecases/Task/UpdateTaskUseCase'
import { RepositoryFactory } from '../../../infrastructure/supabase/repositories/factory.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export const updateTask = async (task: unknown) => {
  try {
    const taskRepository = RepositoryFactory.getTaskRepository()
    const updateUseCase = new UpdateTaskUseCase(taskRepository)
    const entity = await updateUseCase.execute(task)
    revalidatePath('/dashboard')
    return entity.toObject()
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
