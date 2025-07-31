import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GetAllFaqsUseCase } from '@/core/application/usecases/Faq/GetAllFaqsUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
export function useFaqs() {
  const {
    data: faqs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const faqRepository = RepositoryFactory.getFaqRepository();
      const getAllUseCase = new GetAllFaqsUseCase(faqRepository);
      return await getAllUseCase.execute();
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return true;
    },
  });
  return { faqs, isLoading, refetch };
}
