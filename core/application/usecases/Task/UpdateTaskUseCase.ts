import { z } from 'zod';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

const UpdateTaskUseCaseSchema = z
  .object({
    id: z.string(),
    done: z.boolean(),
  })
  .strip();

type UpdateTaskUseCaseInput = z.infer<typeof UpdateTaskUseCaseSchema>;
export class UpdateTaskUseCase implements BaseUseCase<UpdateTaskUseCaseInput, TaskEntity> {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(input: unknown): Promise<TaskEntity> {
    try {
      const data = UpdateTaskUseCaseSchema.parse(input);
      return this.taskRepository.update(data);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
