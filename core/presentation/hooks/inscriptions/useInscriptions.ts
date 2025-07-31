import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getAllInscriptions } from '@/core/presentation/actions/inscriptions/getAllInscriptions';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

export const useInscriptions = () => {
  try {
    const {
      data: inscriptions,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['inscriptions'],
      queryFn: getAllInscriptions,
      enabled: true,
      throwOnError: (error: Error) => {
        toast.error(error.message);
        return true;
      },
    });
    return {
      inscriptions: inscriptions ?? [],
      isLoading,
      refetch,
    };
  } catch (error) {
    const normalizedError = ErrorHandler.normalize(error);
    ErrorHandler.log(normalizedError);
    throw normalizedError;
  }
};
