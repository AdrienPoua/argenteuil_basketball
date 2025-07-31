import { SupabaseClient } from "@supabase/supabase-js"
import { TeamDTO, UpsertTeamWithRelationsDTO } from "../dtos/team.dto"

export async function createTeam(
  client: SupabaseClient,
  payload: Omit<TeamDTO, "id" | "created_at" | "coachs" | "assistantsCoach" | "sessions">
) {
  const { data, error } = await client.from("teams").insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateTeam(
  client: SupabaseClient,
  id: string,
  teamData: Partial<Omit<TeamDTO, "id" | "created_at" | "coachs" | "assistantsCoach" | "sessions">>
) {
  const { data, error } = await client.from("teams").update(teamData).eq("id", id).select().single()
  if (error) throw error
  return data as TeamDTO
}

export async function upsertTeam(client: SupabaseClient, teamData: UpsertTeamWithRelationsDTO) {
  const { data, error } = await client.from("teams").upsert(teamData).select().single()
  if (error) throw error
  return data as TeamDTO
}
