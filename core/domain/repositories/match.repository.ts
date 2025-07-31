import { CreateMatchDTO } from '@/core/application/dtos/match.dto'
import { BaseRepository } from './base.repository'
import { TeamDTO } from '../dtos/team.dto'
import { MatchEntity } from '../entities/match.entity'

export interface MatchDTO {
  //required
  id: string
  date: string
  horaire: number
  salle: string
  nom_equipe_1: string
  nom_equipe_2: string
  //optional numbers
  numero: number | null
  numero_journee: number | null
  id_poule: number | null
  id_organisme_equipe_1: number | null
  id_organisme_equipe_2: number | null
  id_engagement_equipe_1: number | null
  id_engagement_equipe_2: number | null
  resultat_equipe_1: number | null
  resultat_equipe_2: number | null
  handicap_1: number | null
  handicap_2: number | null
  //optional strings
  date_saisie_resultat: string | null
  creation: string | null
  modification: string | null
  code_match: string | null
  etat: string | null
  //boolean
  penalite_equipe_1: boolean | null
  penalite_equipe_2: boolean | null
  forfait_equipe_1: boolean | null
  forfait_equipe_2: boolean | null
  defaut_equipe_1: boolean | null
  defaut_equipe_2: boolean | null
  validee: boolean | null
  remise: boolean | null
  joue: boolean | null
  // added by us
  team: TeamDTO | null
  created_at: string
  arbitre_1: string | null
  arbitre_2: string | null
  marqueur: string | null
  chronometreur: string | null
  is_amical: boolean
}

export type MatchRepository = BaseRepository<MatchEntity, MatchDTO> & {
  getWeeklyHomeMatch(): Promise<MatchEntity[]>
  findAllWithTeam(orderBy: string, orderDirection: string): Promise<MatchEntity[]>
  createWithTeam(dto: CreateMatchDTO): Promise<MatchEntity>
  getUpcomingMatchs(): Promise<MatchEntity[]>
}
