"use server"

import { FindMemberByRoleUseCase } from "@/core/application/usecases/Member/FindMemberByRoleUseCase"
import { FindTeamsByCoachUseCase } from "@/core/application/usecases/Team/FindTeamsByCoachUseCase"
import { MemberRole } from "@/core/domain/entities/member.entity"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"
import { ErrorHandler } from "@/core/shared/error/ErrorHandler"

export async function readCoachsWithTeams() {
  try {
    const memberRepository = RepositoryFactory.getMemberRepository("browser")
    const teamRepository = RepositoryFactory.getTeamRepository("browser")

    const getAllCoachsUseCase = new FindMemberByRoleUseCase(memberRepository)
    const findTeamsByCoachUseCase = new FindTeamsByCoachUseCase(teamRepository)

    const coachs = await getAllCoachsUseCase.execute(MemberRole.Coach)

    // Pour chaque coach, récupérer ses équipes
    const coachsWithTeams = await Promise.all(
      coachs.map(async (coach) => {
        const teams = await findTeamsByCoachUseCase.execute(coach.id)
        return {
          ...coach.toObject(),
          teams: teams.map((team) => team.toObject()),
        }
      })
    )

    return coachsWithTeams
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error)
    ErrorHandler.log(normalizedError)
    throw normalizedError
  }
}
