'use client'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { FindMemberByRoleUseCase } from '@/core/application/usecases/Member/FindMemberByRoleUseCase'
import { MemberRole } from '@/core/domain/entities/member.entity'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'

export default function useCoachs() {
  const {
    data: coachs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['coachs'],
    queryFn: async () => {
      const memberRepository = RepositoryFactory.getMemberRepository()
      const findByRoleUseCase = new FindMemberByRoleUseCase(memberRepository)
      return await findByRoleUseCase.execute(MemberRole.Coach)
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message)
      return true
    },
  })
  return { coachs, isLoading, refetch }
}
