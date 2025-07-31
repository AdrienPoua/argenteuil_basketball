import { BaseRepository } from './base.repository'
import { TaskDTO } from '../dtos/task.dto'
import { TaskEntity } from '../entities/task.entity'

export type TaskRepository = BaseRepository<TaskEntity, TaskDTO>
