'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { Task } from '@/core/application/dtos/task.dto'
import { createTask } from '@/core/presentation/actions/tasks/create'
import { deleteTask } from '@/core/presentation/actions/tasks/delete'
import { updateTask } from '@/core/presentation/actions/tasks/update'
import { useTasks } from '@/core/presentation/hooks/task/useTasks'
// Component
export default function ToDo() {
  const { tasks, isLoading, refetch } = useTasks()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const queryClient = useQueryClient()

  // Mutation pour créer une tâche
  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      const newTask = {
        title,
        done: false,
      }
      return createTask(newTask)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tâche créée avec succès')
      setNewTaskTitle('')
      refetch()
    },
    onError: (error) => {
      toast.error('Erreur lors de la création de la tâche')
      console.error(error)
    },
  })

  // Mutation pour supprimer une tâche
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteTask(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tâche supprimée')
      refetch()
    },
    onError: (error) => {
      toast.error('Erreur lors de la suppression de la tâche')
      console.error(error)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (taskData: { id: string; done: boolean }) => {
      return updateTask(taskData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      refetch()
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour de la tâche')
      console.error(error)
    },
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !createMutation.isPending) {
      handleAddTask()
    }
  }

  const toggleTask = (task: Task) => {
    // Convertir la TaskEntity en objet simple pour la sérialisation
    const taskData = {
      id: task.id,
      done: !task.done,
    }
    updateMutation.mutate(taskData)
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      toast.error('Le titre de la tâche ne peut pas être vide')
      return
    }
    createMutation.mutate(newTaskTitle.trim())
  }

  const handleDeleteTask = (id: string) => {
    deleteMutation.mutate(id)
  }

  const clearCompleted = () => {
    const completedTasks = tasks.filter((task) => task.done)
    completedTasks.forEach((task) => {
      deleteMutation.mutate(task.id)
    })
  }

  // Affichage du chargement
  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg pt-10 shadow">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold">Mes tâches</h2>
      </div>

      <div className="p-6">
        <div className="mb-4 flex">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ajouter une nouvelle tâche..."
            disabled={createMutation.isPending}
            className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
          />
          <button
            onClick={handleAddTask}
            disabled={createMutation.isPending || newTaskTitle.trim() === ''}
            className="rounded-r-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createMutation.isPending ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="py-4 text-center text-gray-500">Aucune tâche à afficher</p>
        ) : (
          <ul className="max-h-64 space-y-3 overflow-y-auto">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="group flex items-center justify-between rounded p-2 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task)}
                    className="h-5 w-5 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                  />
                  <span
                    className={`ml-3 text-sm ${
                      task.done ? 'text-gray-400 line-through' : 'text-gray-700'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={deleteMutation.isPending}
                  className="cursor-pointer text-red-500 opacity-0 transition-opacity hover:text-red-700 disabled:opacity-30 group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {tasks.some((task) => task.done) && (
          <div className="mt-4 text-right">
            <button
              onClick={clearCompleted}
              disabled={deleteMutation.isPending}
              className="cursor-pointer text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Suppression...' : 'Supprimer les tâches terminées'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const LoadingComponent = () => {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold">Mes tâches</h2>
      </div>
      <div className="p-6 text-center">
        <div className="animate-pulse">Chargement des tâches...</div>
      </div>
    </div>
  )
}
