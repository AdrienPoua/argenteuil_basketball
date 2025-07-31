import { SupabaseClient } from '@supabase/supabase-js'

export async function createTeamsCoachs(
  client: SupabaseClient,
  teamId: string,
  coachIds: string[],
) {
  const payload = coachIds.map((coachId) => ({
    team_id: teamId,
    member_id: coachId,
  }))

  const { error } = await client.from('teams_coachs').insert(payload)

  if (error) throw error
}

export async function deleteTeamsCoachs(client: SupabaseClient, teamId: string) {
  const { error } = await client.from('teams_coachs').delete().eq('team_id', teamId)
  if (error) throw error
}
