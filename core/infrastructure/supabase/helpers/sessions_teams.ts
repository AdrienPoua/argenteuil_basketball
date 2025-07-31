import { SupabaseClient } from "@supabase/supabase-js"
import { SessionEntity } from "../../../domain/entities/session.entity"

export async function createSessionsTeam(client: SupabaseClient, teamId: string, sessions: SessionEntity[]) {
  const payload = sessions.map((session) => ({
    session_id: session.id,
    team_id: teamId,
  }))
  const { data, error } = await client.from("sessions_teams").insert(payload)
  if (error) throw error
  return data
}
