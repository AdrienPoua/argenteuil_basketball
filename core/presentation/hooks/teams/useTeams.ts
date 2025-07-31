"use client"

import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { GetAllTeamsUseCase } from "@/core/application/usecases/Team/GetAllTeamsUseCase"
import { RepositoryFactory } from "@/core/infrastructure/supabase/repositories/factory.repository"

export function useTeams() {
  const {
    data: teams,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const teamRepository = RepositoryFactory.getTeamRepository()
      const getAllUseCase = new GetAllTeamsUseCase(teamRepository)
      return await getAllUseCase.execute()
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message)
      return true
    },
  })
  return { teams, isLoading, refetch }
}
