import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GetAllMembersUseCase } from '@/core/application/usecases/Member/GetAllMembersUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';

export function useMembers() {
  const {
    data: members,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const memberRepository = RepositoryFactory.getMemberRepository();
      const getAllUseCase = new GetAllMembersUseCase(memberRepository);
      return await getAllUseCase.execute();
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return true;
    },
  });
  return { members, isLoading, refetch };
}
