import { SupabaseClient } from "@supabase/supabase-js"
import { SupabaseBaseRepository } from "./base.repository"
import { GymnaseEntity } from "../../../domain/entities/gymnase.entity"
import { GymnaseRepository } from "../../../domain/repositories/gymnase.repository"
import { GymnaseDTO } from "../dtos/gymnase.dto"
import { toDomain } from "../mappers/gymnase.mapper"

export class SupabaseGymnaseRepository
  extends SupabaseBaseRepository<GymnaseEntity, GymnaseDTO>
  implements GymnaseRepository
{
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super("gymnases", client, toDomain)
  }
}
