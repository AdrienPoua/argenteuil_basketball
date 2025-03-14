'use client';
import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

// Component
function ToDo() {
  const { tasks, setTasks, loading, error, setError, newTaskTitle, setNewTaskTitle, fetchTasks } = useTaskManagement();

  const { toggleTask, addTask, deleteTask, clearCompleted, handleKeyDown } = useTaskHandlers(
    tasks,
    setTasks,
    newTaskTitle,
    setNewTaskTitle,
    setError,
    fetchTasks,
  );

  // Affichage du chargement
  if (loading) {
    return <LoadingComponent />;
  }

  // Affichage des erreurs
  if (error) {
    return <ErrorComponent error={error} setError={setError} fetchTasks={fetchTasks} />;
  }

  return (
    <div className='max-w-2xl rounded-lg bg-white font-secondary shadow'>
      <div className='border-b border-gray-200 px-6 py-4'>
        <h2 className='text-lg font-semibold'>Mes tâches</h2>
      </div>

      <div className='p-6'>
        <div className='mb-4 flex'>
          <input
            type='text'
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Ajouter une nouvelle tâche...'
            className='flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          />
          <button
            onClick={addTask}
            className='rounded-r-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700'
          >
            Ajouter
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className='py-4 text-center text-gray-500'>Aucune tâche à afficher</p>
        ) : (
          <ul className='max-h-64 space-y-3 overflow-y-auto'>
            {tasks.map((task) => (
              <li key={task.id} className='group flex items-center justify-between rounded p-2 hover:bg-gray-50'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className='h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  />
                  <span className={`ml-3 text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className='text-red-500 opacity-0 transition-opacity hover:text-red-700 group-hover:opacity-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {tasks.some((task) => task.done) && (
          <div className='mt-4 text-right'>
            <button onClick={clearCompleted} className='text-sm text-red-500 hover:text-red-700'>
              Supprimer les tâches terminées
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className='min-h-screen'>
      <ToDo />
    </div>
  );
}

// Custom hooks
const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Charger les tâches au chargement du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fonction pour récupérer les tâches depuis l'API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des tâches');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger vos tâches');
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    error,
    setError,
    newTaskTitle,
    setNewTaskTitle,
    fetchTasks,
  };
};

// Handlers
const useTaskHandlers = (
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  newTaskTitle: string,
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  fetchTasks: () => Promise<void>,
) => {
  // Fonction pour basculer l'état d'une tâche
  const toggleTask = async (id: string) => {
    // Optimistic update
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));

    setTasks(updatedTasks);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: !taskToUpdate.done }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la tâche');
      }
    } catch (err) {
      console.error('Erreur:', err);
      // Restauration de l'état précédent en cas d'erreur
      setTasks(tasks);
      setError('Impossible de mettre à jour la tâche');
    }
  };

  // Fonction pour ajouter une nouvelle tâche
  const addTask = async () => {
    if (newTaskTitle.trim() === '') return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la tâche");
      }

      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      console.error('Erreur:', err);
      setError("Impossible d'ajouter la tâche");
    }
  };

  // Fonction pour supprimer une tâche
  const deleteTask = async (id: string) => {
    // Optimistic update
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la tâche');
      }
    } catch (err) {
      console.error('Erreur:', err);
      // Restauration de l'état précédent en cas d'erreur
      fetchTasks();
      setError('Impossible de supprimer la tâche');
    }
  };

  // Fonction pour supprimer toutes les tâches terminées
  const clearCompleted = async () => {
    // Optimistic update
    const updatedTasks = tasks.filter((task) => !task.done);
    setTasks(updatedTasks);

    try {
      const response = await fetch('/api/tasks/clear-completed', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression des tâches terminées');
      }
    } catch (err) {
      console.error('Erreur:', err);
      // Restauration de l'état précédent en cas d'erreur
      fetchTasks();
      setError('Impossible de supprimer les tâches terminées');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return {
    toggleTask,
    addTask,
    deleteTask,
    clearCompleted,
    handleKeyDown,
  };
};

const LoadingComponent = () => {
  return (
    <div className='rounded-lg bg-white shadow'>
      <div className='border-b border-gray-200 px-6 py-4'>
        <h2 className='text-lg font-semibold'>Mes tâches</h2>
      </div>
      <div className='p-6 text-center'>
        <div className='animate-pulse'>Chargement des tâches...</div>
      </div>
    </div>
  );
};

const ErrorComponent = ({
  error,
  setError,
  fetchTasks,
}: {
  error: string;
  setError: (error: string | null) => void;
  fetchTasks: () => Promise<void>;
}) => {
  return (
    <div className='rounded-lg bg-white shadow'>
      <div className='border-b border-gray-200 px-6 py-4'>
        <h2 className='text-lg font-semibold'>Mes tâches</h2>
      </div>
      <div className='p-6'>
        <div className='text-red-500'>{error}</div>
        <button
          onClick={() => {
            setError(null);
            fetchTasks();
          }}
          className='mt-2 text-indigo-600 hover:text-indigo-800'
        >
          Réessayer
        </button>
      </div>
    </div>
  );
};
