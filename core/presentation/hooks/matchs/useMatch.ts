'use client';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GetAllMatchsUseCase } from '@/core/application/usecases/Matchs/GetAllMatchsUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';

export function useMatchs() {
  const {
    data: matchs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['matchs'],
    queryFn: async () => {
      const matchRepository = RepositoryFactory.getMatchRepository();
      const getAllUseCase = new GetAllMatchsUseCase(matchRepository);
      return await getAllUseCase.execute();
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return true;
    },
  });
  return { matchs, isLoading, refetch };
}
