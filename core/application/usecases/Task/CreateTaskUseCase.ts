import { z } from 'zod';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import { ErrorHandler } from '../../../shared/error/ErrorHandler';
import { BaseUseCase } from '../BaseUseCase';

const CreateTaskUseCaseSchema = z.object({
  title: z.string(),
  done: z.boolean(),
});

type CreateTaskUseCaseInput = z.infer<typeof CreateTaskUseCaseSchema>;

export class CreateTaskUseCase implements BaseUseCase<CreateTaskUseCaseInput, TaskEntity> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: unknown): Promise<TaskEntity> {
    try {
      const data = CreateTaskUseCaseSchema.parse(input);
      return this.taskRepository.create(data);
    } catch (error) {
      const appError = ErrorHandler.normalize(error);
      ErrorHandler.log(appError);
      throw appError;
    }
  }
}
