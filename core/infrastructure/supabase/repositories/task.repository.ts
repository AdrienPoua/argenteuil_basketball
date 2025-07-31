import { SupabaseClient } from "@supabase/supabase-js"
import { SupabaseBaseRepository } from "./base.repository"
import { TaskEntity } from "../../../domain/entities/task.entity"
import { TaskRepository } from "../../../domain/repositories/task.repository"
import { TaskDTO } from "../dtos/task.dto"
import { toDomain } from "../mappers/task.mapper"

export class SupabaseTaskRepository extends SupabaseBaseRepository<TaskEntity, TaskDTO> implements TaskRepository {
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super("tasks", client, toDomain)
  }
}
