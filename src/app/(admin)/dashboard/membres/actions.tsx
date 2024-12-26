"use server"
import { z } from "zod"
import { CoachSchema } from "@/database/schemas/Coach"
import { LeaderSchema } from "@/database/schemas/Leader"
import { CoachService } from "@/database/services/Coach"
import { LeaderService } from "@/database/services/Leader"
import { TeamService } from "@/database/services/Team"

const coachService = new CoachService()
const leaderService = new LeaderService()
const teamService = new TeamService()

export const createCoach = async (data: z.infer<typeof CoachSchema>) => {
    await coachService.createCoach(data)
}

export const createLeader = async (data: z.infer<typeof LeaderSchema>) => {
    await leaderService.createLeader(data)
}
export const getTeams = async () => {
    const teams = await teamService.getTeams()
    return teams
}




