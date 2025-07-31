import { SupabaseClient } from '@supabase/supabase-js'

export async function createTeamsAssistants(
  client: SupabaseClient,
  teamId: string,
  assistantIds: string[],
) {
  const assistantRelations = assistantIds.map((assistantId) => ({
    team_id: teamId,
    member_id: assistantId,
  }))

  const { error } = await client.from('teams_assistants').insert(assistantRelations)

  if (error) throw error
}

export async function deleteTeamsAssistants(client: SupabaseClient, teamId: string) {
  const { error } = await client.from('teams_assistants').delete().eq('team_id', teamId)
  if (error) throw error
}
