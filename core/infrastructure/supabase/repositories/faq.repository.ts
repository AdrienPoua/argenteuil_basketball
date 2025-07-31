import { SupabaseClient } from "@supabase/supabase-js"
import { SupabaseBaseRepository } from "./base.repository"
import { FaqEntity } from "../../../domain/entities/faq.entity"
import { FaqRepository } from "../../../domain/repositories/faq.repository"
import { FaqDTO } from "../dtos/faq.dto"
import { toDomain } from "../mappers/faq.mapper"

export class SupabaseFaqRepository extends SupabaseBaseRepository<FaqEntity, FaqDTO> implements FaqRepository {
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super("faqs", client, toDomain)
  }
}
