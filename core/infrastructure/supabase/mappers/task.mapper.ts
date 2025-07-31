import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskDTO } from '../dtos/task.dto';

export function toDomain(data: TaskDTO): TaskEntity {
  return new TaskEntity(data);
}

export function toPersistence(entity: TaskEntity): TaskDTO {
  return {
    id: entity.id,
    title: entity.title,
    done: entity.done,
    created_at: entity.created_at,
  };
}
