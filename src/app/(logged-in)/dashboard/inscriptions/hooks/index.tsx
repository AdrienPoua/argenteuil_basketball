import { useState } from 'react';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { getInscriptions } from '@/actions/fetchs/database/getInscriptions';
import { toast } from '@/hooks/use-toast';
import { useQuery } from 'react-query';

export const useHooks = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  // État pour les filtres de colonne
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // État pour le filtre de statut
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const {
    data: inscriptions = [],
    isLoading,
    isError,
  } = useQuery('inscriptions', getInscriptions, {
    onError: (error) => {
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer les inscriptions. Veuillez réessayer.',
        variant: 'destructive',
      });
      console.error('Error fetching inscriptions:', error);
    },
  });

  return {
    sorting,
    columnFilters,
    selectedStatus,
    setSorting,
    setColumnFilters,
    setSelectedStatus,
    inscriptions,
    isLoading,
    isError,
  };
};
