import { TaskEntity } from '../../../domain/entities/task.entity'
import { TaskRepository } from '../../../domain/repositories/task.repository'
import { ErrorHandler } from '../../../shared/error/ErrorHandler'

export class GetAllTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<TaskEntity[]> {
    try {
      const tasks = await this.taskRepository.findAll()
      return tasks.sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      })
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
