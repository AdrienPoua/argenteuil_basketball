'use client';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GetAllGymnasesUseCase } from '@/core/application/usecases/Gymnases/getAllGymnases';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
export function useGymnases() {
  const {
    data: gymnases,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['gymnases'],
    queryFn: async () => {
      const gymnaseRepository = RepositoryFactory.getGymnaseRepository();
      const getAllUseCase = new GetAllGymnasesUseCase(gymnaseRepository);
      return await getAllUseCase.execute();
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return true;
    },
  });
  return { gymnases, isLoading, refetch };
}
