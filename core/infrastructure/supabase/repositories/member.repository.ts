import { SupabaseClient } from '@supabase/supabase-js'
import { SupabaseBaseRepository } from './base.repository'
import { MemberEntity, MemberRole } from '../../../domain/entities/member.entity'
import { MemberRepository } from '../../../domain/repositories/member.repository'
import { MemberDTO } from '../dtos/member.dto'
import { toDomain } from '../mappers/member.mapper'

export class SupabaseMemberRepository
  extends SupabaseBaseRepository<MemberEntity, MemberDTO>
  implements MemberRepository
{
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super('members', client, toDomain)
  }

  public async findByRole(role: MemberRole): Promise<MemberEntity[]> {
    const client = await this.getClient()
    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .filter('role', 'cs', `{${role}}`)
    if (error) throw error
    return data.map((item) => toDomain(item))
  }

  public async findDirigeants(): Promise<MemberEntity[]> {
    const client = await this.getClient()
    const dirigeants = [
      MemberRole.President,
      MemberRole.VicePresident,
      MemberRole.Secretary,
      MemberRole.Treasurer,
      MemberRole.Correspondant,
    ]
    // Utiliser overlaps pour les colonnes de type array - format PostgreSQL
    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .filter('role', 'ov', `{${dirigeants.join(',')}}`)
    if (error) throw error
    return data.map((item) => toDomain(item))
  }

  public async findMembers(): Promise<MemberEntity[]> {
    const client = await this.getClient()
    const { data, error } = await client
      .from(this.tableName)
      .select('*')
      .not('role', 'cs', '{coach}')
    if (error) throw error
    return data.map((item) => toDomain(item))
  }
}
