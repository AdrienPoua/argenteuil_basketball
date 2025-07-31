"use client"

import { MatchEntity } from "@/core/domain/entities/match.entity"
import { TeamEntity } from "@/core/domain/entities/team.entity"
import CreateMatchForm from "./match-form-create"
import UpdateMatchForm from "./match-form-update"

type PropsType = {
  currentMatch: MatchEntity | null
  actions: {
    success: () => void
  }
  teams: TeamEntity[]
  currentTeam: TeamEntity | null
}

export function MatchForm({ currentMatch, actions, currentTeam, teams }: Readonly<PropsType>) {
  if (currentMatch) {
    return <UpdateMatchForm currentMatch={currentMatch} actions={actions} currentTeam={currentTeam} />
  }
  return <CreateMatchForm actions={actions} teams={teams} />
}
