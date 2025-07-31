import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseBaseRepository } from './base.repository';
import { SessionEntity } from '../../../domain/entities/session.entity';
import { SessionRepository } from '../../../domain/repositories/session.repository';
import { SessionDTO } from '../dtos/session.dto';
import { toDomain } from '../mappers/session.mapper';
export class SupabaseSessionRepository
  extends SupabaseBaseRepository<SessionEntity, SessionDTO>
  implements SessionRepository
{
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super('sessions', client, toDomain);
  }
}
