import { SupabaseClient } from "@supabase/supabase-js"
import { SupabaseBaseRepository } from "./base.repository"
import { InscriptionEntity } from "../../../domain/entities/inscription.entity"
import { InscriptionRepository } from "../../../domain/repositories/inscription.repository"
import { InscriptionDTO } from "../dtos/inscription.dto"
import { toDomain } from "../mappers/inscription.mapper"

export class SupabaseInscriptionRepository
  extends SupabaseBaseRepository<InscriptionEntity, InscriptionDTO>
  implements InscriptionRepository
  {
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super("inscriptions", client, toDomain)
  }
}
