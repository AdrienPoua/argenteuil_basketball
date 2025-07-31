import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { GetAllTasksUseCase } from '@/core/application/usecases/Task/GetAllTasksUseCase'
import { RepositoryFactory } from '@/core/infrastructure/supabase/repositories/factory.repository'

export const useTasks = () => {
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const taskRepository = RepositoryFactory.getTaskRepository()
      const getAllUseCase = new GetAllTasksUseCase(taskRepository)
      return await getAllUseCase.execute()
    },
    enabled: true,
    throwOnError: (error: Error) => {
      toast.error(error.message)
      return true
    },
  })

  return {
    tasks: tasks ?? [],
    isLoading,
    refetch,
  }
}
