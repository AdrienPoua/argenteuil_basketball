import { SupabaseClient } from '@supabase/supabase-js'
import { SupabaseBaseRepository } from './base.repository'
import { TarifDTO } from '../../../domain/dtos/tarif.dto'
import { TarifEntity } from '../../../domain/entities/tarif.entity'
import { TarifRepository } from '../../../domain/repositories/tarif.repository'
import { toDomain } from '../mappers/tarif.mapper'

export class SupabaseTarifRepository
  extends SupabaseBaseRepository<TarifEntity, TarifDTO>
  implements TarifRepository
{
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super('tarifs', client, toDomain)
  }
}
