'use client'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  InscriptionEntity,
  StatutInscription,
  TypeInscription,
} from '@/core/domain/entities/inscription.entity'
import { deleteInscription } from '@/core/presentation/actions/inscriptions/deleteInscription'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'

// Constants
export const ITEMS_PER_PAGE = 20

// Status label utility
export function getStatusLabel(status: StatutInscription): string {
  switch (status) {
    case 'EN_ATTENTE':
      return 'En attente'
    case 'TRAITEE':
      return 'Traitée'
    case 'REJETEE':
      return 'Refusée'
    default:
      return 'Inconnu'
  }
}

export function getTypeLabel(type: TypeInscription): string {
  switch (type) {
    case 'RENOUVELLEMENT':
      return 'Renouvellement'
    case 'MUTATION':
      return 'Mutation'
    case 'NOUVELLE_LICENCE':
      return 'Nouvelle licence'
    case 'RENOUVELLEMENT_SANS_MUTATION':
      return 'Renouvellement sans mutation'
    default:
      return 'Inconnu'
  }
}

export function usePreInscriptionsPage({ inscriptions }: { inscriptions: InscriptionEntity[] }) {
  const inscriptionsEntities = useMemo(() => inscriptions, [inscriptions])
  const [statusFilter, setStatusFilter] = useState<StatutInscription | 'all'>('all')
  const [sorting, setSorting] = useState<SortingState>([])
  const columns = useMemo<ColumnDef<InscriptionEntity, unknown>[]>(
    () => [
      {
        accessorKey: 'lastName',
        header: () => <span>Nom</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'firstName',
        header: () => <span>Prénom</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'dateOfBirth',
        header: () => <span>Date de naissance</span>,
        cell: (info) =>
          info.row.original.dateOfBirth
            ? new Date(info.row.original.dateOfBirth).toLocaleDateString()
            : '',
      },
      {
        accessorKey: 'typeInscription',
        header: () => <span>Type</span>,
        cell: (info) => getTypeLabel(info.row.original.typeInscription),
      },
      {
        accessorKey: 'status',
        header: () => <span>Statut</span>,
        cell: (info) => getStatusLabel(info.row.original.status),
      },
      {
        accessorKey: 'created_at',
        header: () => <span>Date de création</span>,
        cell: (info) =>
          info.row.original.created_at
            ? new Date(info.row.original.created_at).toLocaleString()
            : '',
      },
    ],
    [],
  )

  // Filtrage par statut
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return inscriptionsEntities
    return inscriptionsEntities.filter((i) => String(i.status) === statusFilter)
  }, [inscriptionsEntities, statusFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,
    manualSorting: false,
  })

  return { statusFilter, setStatusFilter, filteredData, table }
}

export function useInscriptionModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentInscription, setCurrentInscription] = useState<InscriptionEntity | null>(null)

  const modalActions = {
    edit: (inscription: InscriptionEntity) => {
      setCurrentInscription(inscription)
      setIsDialogOpen(true)
    },
    openChange: (open: boolean) => {
      setIsDialogOpen(open)
      if (!open) {
        setCurrentInscription(null)
      }
    },
    success: () => {
      setIsDialogOpen(false)
      setCurrentInscription(null)
      // Trigger a refresh if needed
      window.location.reload()
    },
  }

  return {
    isDialogOpen,
    currentInscription,
    modalActions,
  }
}

// Hook for inscription actions
export function useInscriptionActions() {
  const deleteAction = async (rowId: string) => {
    try {
      await deleteInscription(rowId)
      toast.success('Pré-inscription supprimée !')
      // Trigger a refresh if needed
      window.location.reload()
    } catch (error) {
      const normalizedError = ErrorHandler.normalize(error)
      ErrorHandler.log(normalizedError)
      toast.error(ErrorHandler.userMessage(error))
    }
  }

  return { deleteAction }
}

// Types for components
export type StatusFilterProps = {
  statusFilter: StatutInscription | 'all'
  setStatusFilter: (value: StatutInscription | 'all') => void
}

export type InscriptionsTableProps = {
  table: Table<InscriptionEntity>
  actions: {
    edit: (inscription: InscriptionEntity) => void
    delete: (id: string) => void
    extranet: (inscription: InscriptionEntity) => void
  }
  loadingExtranet: string | null
}
