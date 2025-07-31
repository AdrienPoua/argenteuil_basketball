import { SupabaseClient } from '@supabase/supabase-js'
import { SupabaseBaseRepository } from './base.repository'
import { MatchEntity } from '../../../domain/entities/match.entity'
import { MatchRepository } from '../../../domain/repositories/match.repository'
import club from '../../../shared/config/club'
import { CreateMatchDTO, MatchDTO } from '../dtos/match.dto'
import { toDomain } from '../mappers/match.mapper'

export class SupabaseMatchRepository
  extends SupabaseBaseRepository<MatchEntity, MatchDTO>
  implements MatchRepository
{
  constructor(client: SupabaseClient | Promise<SupabaseClient>) {
    super('matchs', client, toDomain)
  }

  async createWithTeam(dto: CreateMatchDTO): Promise<MatchEntity> {
    const client = await this.client
    const { data, error } = await client.from('matchs').insert(dto).select().single()
    if (error) throw error
    return toDomain(data)
  }

  async findAllWithTeam(orderBy: string, orderDirection: string): Promise<MatchEntity[]> {
    const client = await this.client
    const { data, error } = await client
      .from('matchs')
      .select('*, team:team_id(*)')
      .order(orderBy, {
        ascending: orderDirection === 'asc',
      })
      .order('horaire', { ascending: true })
    if (error) throw error
    return data.map(toDomain)
  }

  async getWeeklyHomeMatch(): Promise<MatchEntity[]> {
    const client = await this.client
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7))
    startOfWeek.setHours(0, 0, 0, 0)

    // Fin de la semaine (dimanche)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const startDate = startOfWeek.toISOString().split('T')[0]
    const endDate = endOfWeek.toISOString().split('T')[0]

    const { data, error } = await client
      .from('matchs')
      .select('*, team:team_id(*)')
      .filter('date', 'gte', startDate)
      .filter('date', 'lte', endDate)
      .filter('id_organisme_equipe_1', 'eq', club.clubId)

    if (error) throw error
    return data.map(toDomain)
  }

  async getUpcomingMatchs(): Promise<MatchEntity[]> {
    const client = await this.client
    const today = new Date()

    console.log('today', today.toISOString())

    const { data, error } = await client
      .from('matchs')
      .select('*, team:team_id(*)')
      .filter('date', 'gte', today.toISOString())
      .order('date', { ascending: true })

    console.log('data', data)
    if (error) throw error
    return data.map(toDomain)
  }
}
