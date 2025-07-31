import { PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import { SupabaseBaseRepository } from "./base.repository"
import { TeamEntity } from "../../../domain/entities/team.entity"
import { SessionRepository } from "../../../domain/repositories/session.repository"
import { TeamRepository } from "../../../domain/repositories/team.repository"
import {
  CreateTeamWithRelationsDTO,
  TeamDTO,
  UpdateTeamWithRelationsDTO,
  UpsertTeamWithRelationsDTO,
} from "../dtos/team.dto"
import { createSessionsTeam } from "../helpers/sessions_teams"
import { createTeam, updateTeam, upsertTeam } from "../helpers/teams"
import { createTeamsAssistants, deleteTeamsAssistants } from "../helpers/teams_assistants"
import { createTeamsCoachs, deleteTeamsCoachs } from "../helpers/teams_coachs"
import { toDomain } from "../mappers/team.mapper"

export class SupabaseTeamRepository extends SupabaseBaseRepository<TeamEntity, TeamDTO> implements TeamRepository {
  private readonly supabaseSessionRepository: SessionRepository

  constructor(client: SupabaseClient | Promise<SupabaseClient>, sessionRepository: SessionRepository) {
    super("teams", client, toDomain)
    this.supabaseSessionRepository = sessionRepository
  }

  async createWithRelations(input: CreateTeamWithRelationsDTO): Promise<TeamEntity> {
    try {
      const client = await this.getClient()
      const { coachsIds, assistantsCoachIds, sessions, ...teamData } = input

      const { id: teamId } = await createTeam(client, teamData)

      if (sessions && sessions.length > 0) {
        const createdSessions = await this.supabaseSessionRepository.createMany(sessions)
        await createSessionsTeam(client, teamId, createdSessions)
      }

      if (coachsIds && coachsIds.length > 0) {
        await createTeamsCoachs(client, teamId, coachsIds)
      }

      if (assistantsCoachIds && assistantsCoachIds.length > 0) {
        await createTeamsAssistants(client, teamId, assistantsCoachIds)
      }

      const team = await this.findByIdWithRelations(teamId)
      return team
    } catch (error) {
      throw this.handleError(error as PostgrestError)
    }
  }

  async updateWithRelations(id: string, input: UpdateTeamWithRelationsDTO): Promise<TeamEntity> {
    try {
      const client = await this.getClient()
      const { coachsIds, assistantsCoachIds, sessions, ...teamData } = input

      const existingTeam = await this.findByIdWithRelations(id)
      if (!existingTeam) {
        throw new Error(`L'équipe avec l'ID ${id} n'existe pas`)
      }

      const updatedTeam = await updateTeam(client, id, teamData)

      await deleteTeamsCoachs(client, existingTeam.id)
      await deleteTeamsAssistants(client, existingTeam.id)
      await this.supabaseSessionRepository.delete(existingTeam.sessions.map((session) => session.id))

      if (sessions && sessions.length > 0) {
        const createdSessions = await this.supabaseSessionRepository.createMany(sessions)
        await createSessionsTeam(client, updatedTeam.id, createdSessions)
      }

      if (coachsIds && coachsIds.length > 0) {
        await createTeamsCoachs(client, updatedTeam.id, coachsIds)
      }

      if (assistantsCoachIds && assistantsCoachIds.length > 0) {
        await createTeamsAssistants(client, updatedTeam.id, assistantsCoachIds)
      }

      // 5. Retourner l'entité mise à jour
      return await this.findByIdWithRelations(updatedTeam.id)
    } catch (error) {
      throw this.handleError(error as PostgrestError)
    }
  }

  async upsertWithRelations(input: UpsertTeamWithRelationsDTO): Promise<TeamEntity> {
    try {
      const client = await this.getClient()
      const { coachsIds, assistantsCoachIds, sessions, ...teamData } = input

      const { id: teamId } = await upsertTeam(client, teamData)

      if (input.id) {
        const existingTeam = await this.findByIdWithRelations(input.id)
        await deleteTeamsCoachs(client, existingTeam.id)
        await deleteTeamsAssistants(client, existingTeam.id)
        await this.supabaseSessionRepository.delete(existingTeam.sessions.map((session) => session.id))
      }

      if (sessions && sessions.length > 0) {
        const createdSessions = await this.supabaseSessionRepository.createMany(sessions)
        await createSessionsTeam(client, teamId, createdSessions)
      }

      if (coachsIds && coachsIds.length > 0) {
        await createTeamsCoachs(client, teamId, coachsIds)
      }

      if (assistantsCoachIds && assistantsCoachIds.length > 0) {
        await createTeamsAssistants(client, teamId, assistantsCoachIds)
      }

      return await this.findByIdWithRelations(teamId)
    } catch (error) {
      throw this.handleError(error as PostgrestError)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const client = await this.getClient()
      const existingTeam = await this.findByIdWithRelations(id)
      if (!existingTeam) {
        throw new Error(`L'équipe avec l'ID ${id} n'existe pas`)
      }
      await client.from(this.tableName).delete().eq("id", id)
      await this.supabaseSessionRepository.delete(existingTeam.sessions.map((session) => session.id))
    } catch (error) {
      throw this.handleError(error as PostgrestError)
    }
  }

  async findByIdWithRelations(id: string): Promise<TeamEntity> {
    try {
      const client = await this.getClient()
      const { data, error } = await client
        .from(this.tableName)
        .select(
          `
        *,
        coachs:teams_coachs!team_id(
          member:member_id(*)
        ),
        assistantsCoach:teams_assistants!team_id(
          member:member_id(*)
        ),
        sessions:sessions_teams!team_id(
          sessions:session_id(*)
        )
      `
        )
        .eq("id", id)
        .single()

      if (error) throw error
      if (!data) throw new Error(`L'équipe avec l'ID ${id} n'existe pas`)
      return toDomain(data)
    } catch (error) {
      throw this.handleError(error as PostgrestError)
    }
  }

  async findAllWithRelations(): Promise<TeamEntity[]> {
    try {
      const client = await this.getClient()

      // Récupérer toutes les équipes avec leurs relations
      const { data, error } = await client
        .from(this.tableName)
        .select(
          `
        *,
        coachs:teams_coachs!team_id(
          member:member_id(*)
        ),
        assistantsCoach:teams_assistants!team_id(
          member:member_id(*)
        ),
        sessions:sessions_teams!team_id(
          sessions:session_id(*)
        )
      `
        )
        .overrideTypes<TeamDTO[]>()

      if (error) throw error
      if (!data || data.length === 0) return []
      // Transformer les données en entités
      const entity = data.map((team) => toDomain(team as TeamDTO))
      return entity
    } catch (error) {
      throw this.handleError(error as PostgrestError)
    }
  }
}
