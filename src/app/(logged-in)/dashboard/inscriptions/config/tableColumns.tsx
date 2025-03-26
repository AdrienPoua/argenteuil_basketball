import { ColumnDef } from '@tanstack/react-table';
import { Inscription } from '@prisma/client';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { LicenseType } from '../components/LicenceType';
import { StatusBadge } from '../components/Badges';
import { Button } from '@/components/ui/button';
import { DeleteDialog } from '../components/DeleteDialog';
import { EditDialog } from '../components/EditDialog';

// Modifier pour accepter false | SortDirection
const SortedArrow = (order: boolean | 'asc' | 'desc') => {
  if (order === 'asc') {
    return <ArrowUp className='h-4 w-4' />;
  } else if (order === 'desc') {
    return <ArrowDown className='h-4 w-4' />;
  } else {
    return <ArrowUpDown className='h-4 w-4 opacity-50' />;
  }
};

// Ajouter la fonction handleFBIClick manquante
const handleFBIClick = (id: string) => {
  // Implémentation temporaire
  console.log(`Envoi à FBI pour l'inscription ${id}`);
  alert(`Envoi à FBI pour l'inscription ${id}`);
};

export const columns: ColumnDef<Inscription>[] = [
  {
    accessorKey: 'nom',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Nom et Prénom</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => (
      <div>
        {row.original.nom} {row.original.prenom}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Email</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
  },
  {
    accessorKey: 'numero',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Téléphone</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
  },
  {
    accessorKey: 'dateNaissance',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Date de naissance</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => (
      <span>
        {new Date(row.original.dateNaissance).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </span>
    ),
  },
  {
    accessorKey: 'Renouvellement',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Type de licence</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => <LicenseType inscription={row.original} />,
  },
  {
    accessorKey: 'surclassement',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Surclassement</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => (row.original.surclassement ? <Badge>Oui</Badge> : <Badge>Non</Badge>),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Date d&apos;inscription</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => <span>{format(new Date(row.original.createdAt), 'Pp', { locale: fr })}</span>,
  },
  {
    accessorKey: 'statut',
    header: ({ column }) => (
      <button
        className='flex w-full items-center space-x-1 text-left font-semibold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Statut</span>
        {SortedArrow(column.getIsSorted())}
      </button>
    ),
    cell: ({ row }) => <StatusBadge statut={row.original.statut} />,
    filterFn: (row, id, value) => {
      return value === 'all' ? true : row.getValue(id) === value;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <EditDialog inscription={row.original} />
        <Button size='sm' onClick={() => handleFBIClick(row.original.id)}>
          Envoyer à FBI
        </Button>
        <DeleteDialog inscription={row.original} />
      </div>
    ),
  },
];
