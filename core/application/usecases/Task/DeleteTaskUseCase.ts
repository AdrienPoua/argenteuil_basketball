import { TaskRepository } from "../../../domain/repositories/task.repository"
import { ErrorHandler } from "../../../shared/error/ErrorHandler"

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.taskRepository.delete(id)
    } catch (error) {
      const appError = ErrorHandler.normalize(error)
      ErrorHandler.log(appError)
      throw appError
    }
  }
}
