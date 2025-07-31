import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getAllTarifs } from '@/core/presentation/actions/tarifs/read'

export function useTarifs() {
  const {
    data: tarifs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tarifs'],
    queryFn: async () => {
      return await getAllTarifs()
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message)
      return true
    },
  })
  return { tarifs, isLoading, refetch }
}
