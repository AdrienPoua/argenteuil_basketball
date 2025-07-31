import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GetAllDocumentsUseCase } from '@/core/application/usecases/Document/ReadDocumentUseCase';
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository';
export default function useDocuments() {
  const {
    data: documents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const documentRepository = RepositoryFactory.getDocumentRepository();
      const getAllUseCase = new GetAllDocumentsUseCase(documentRepository);
      return await getAllUseCase.execute();
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return true;
    },
  });
  return { documents, isLoading, refetch };
}
