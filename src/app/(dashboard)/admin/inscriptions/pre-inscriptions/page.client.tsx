'use client'
import { Cell, flexRender, Header, HeaderGroup } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { InscriptionFormUpdate } from '@/components/forms/inscription-form-update'
import { AlertDialogConfirm } from '@/components/ui/alert-dialog-confirm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { InscriptionEntity } from '@/core/domain/entities/inscription.entity'
import { InscriptionDTO } from '@/core/infrastructure/supabase/dtos/inscription.dto'
import { toDomain } from '@/core/infrastructure/supabase/mappers/inscription.mapper'
import { fillExtranetFormAction } from '@/core/presentation/actions/inscriptions/fillExtranetForm'
import { ErrorHandler } from '@/core/shared/error/ErrorHandler'
import {
  getStatusLabel,
  InscriptionsTableProps,
  ModificationDialogProps,
  PaginationProps,
  StatusFilterProps,
  useInscriptionActions,
  useInscriptionModal,
  usePagination,
  usePreInscriptionsPage,
} from './page.hooks'

type PropsType = {
  inscriptions: InscriptionDTO[]
}

export default function PreInscriptionsPage({ inscriptions: data }: PropsType) {
  const inscriptions = useMemo(() => data.map((inscription) => toDomain(inscription)), [data])
  const { statusFilter, setStatusFilter, filteredData, table } = usePreInscriptionsPage({
    inscriptions,
  })
  const { paginatedData, totalPages, startIndex, endIndex, currentPage, setCurrentPage } =
    usePagination(table, statusFilter)
  const { isDialogOpen, currentInscription, modalActions } = useInscriptionModal()
  const { deleteAction } = useInscriptionActions()

  // État pour gérer le chargement du script Puppeteer
  const [loadingExtranet, setLoadingExtranet] = useState<string | null>(null)

  const handleExtranetAction = async (inscription: InscriptionEntity) => {
    setLoadingExtranet(inscription.id)
    try {
      toast.info('Lancement du script Extranet...')

      // Extract only the serializable data needed by the server action
      const formData = {
        firstName: inscription.firstName,
        lastName: inscription.lastName,
        email: inscription.email,
        dateOfBirth: inscription.dateOfBirth.toISOString(),
        gender: inscription.gender,
        surclassement: inscription.surclassement,
      }

      const result = await fillExtranetFormAction(formData)

      if (result.success) {
        toast.success('Formulaire Extranet rempli avec succès !')
      } else {
        toast.error(result.error || 'Erreur lors du remplissage du formulaire Extranet')
      }
    } catch (error) {
      const normalizedError = ErrorHandler.normalize(error)
      ErrorHandler.log(normalizedError)
      toast.error(ErrorHandler.userMessage(error))
    } finally {
      setLoadingExtranet(null)
    }
  }

  const actions = {
    edit: modalActions.edit,
    success: modalActions.success,
    delete: deleteAction,
    openChange: modalActions.openChange,
    extranet: handleExtranetAction,
  }
  return (
    <div className="mx-auto max-w-5xl rounded-lg pt-10 shadow">
      <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">Pré-inscriptions</h2>
        <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>
      <div className="p-6">
        {filteredData.length === 0 ? (
          <NoInscriptions />
        ) : (
          <InscriptionsTable
            table={table}
            paginatedData={paginatedData}
            actions={actions}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            startIndex={startIndex}
            endIndex={endIndex}
            loadingExtranet={loadingExtranet}
          />
        )}
      </div>

      {currentInscription && (
        <ModificationDialog
          isDialogOpen={isDialogOpen}
          actions={actions}
          currentInscription={currentInscription}
        />
      )}
    </div>
  )
}

function StatusFilter({ statusFilter, setStatusFilter }: StatusFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="mr-2 text-sm font-medium">Filtrer par statut :</span>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40">
          <SelectValue>
            {statusFilter === 'all' ? 'Tous' : getStatusLabel(statusFilter)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="EN_ATTENTE">En attente</SelectItem>
          <SelectItem value="TRAITEE">Traitée</SelectItem>
          <SelectItem value="REJETEE">Refusée</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function InscriptionsTable(props: InscriptionsTableProps) {
  const {
    table,
    paginatedData,
    actions,
    totalPages,
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex,
    loadingExtranet,
  } = props

  return (
    <div className="border-t">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<InscriptionEntity>) => (
            <tr key={headerGroup.id} className="border-b text-primary">
              {headerGroup.headers.map((header: Header<InscriptionEntity, unknown>) => (
                <th
                  key={header.id}
                  className={`px-4 py-3 text-left text-sm font-medium ${
                    header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-muted/70' : ''
                  }`}
                  onClick={
                    header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined
                  }
                >
                  <div className="flex items-center">
                    <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                    {header.column.getIsSorted() === 'asc' && <span className="ml-1">▲</span>}
                    {header.column.getIsSorted() === 'desc' && <span className="ml-1">▼</span>}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="border-b transition-colors hover:bg-primary/50">
              {row.getVisibleCells().map((cell: Cell<InscriptionEntity, unknown>) => {
                const renderedValue = flexRender(cell.column.columnDef.cell, cell.getContext())
                return (
                  <td
                    key={cell.id}
                    className="px-4 py-4 text-sm"
                    title={typeof renderedValue === 'string' ? renderedValue : ''}
                  >
                    {renderedValue}
                  </td>
                )
              })}
              <td className="px-4 py-4">
                <div className="flex flex-nowrap justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => actions.extranet(row.original)}
                    disabled={loadingExtranet === row.original.id}
                    className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {loadingExtranet === row.original.id ? '⏳' : '🌐'} Extranet
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => actions.edit(row.original)}>
                    Modifier
                  </Button>
                  <AlertDialogConfirm
                    title="Êtes-vous sûr de vouloir supprimer cette pré-inscription ?"
                    description="Cette action est irréversible."
                    onConfirm={() => actions.delete(row.original.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          table={table}
        />
      )}
    </div>
  )
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  startIndex,
  endIndex,
  table,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between border-t bg-white px-4 py-3">
      <div className="flex items-center text-sm text-gray-500">
        Affichage de {startIndex + 1} à {endIndex} sur {table.getRowModel().rows.length} résultats
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(pageNumber)}
              className="h-8 w-8"
            >
              {pageNumber}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}

const ModificationDialog = ({
  isDialogOpen,
  actions,
  currentInscription,
}: ModificationDialogProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={actions.openChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier la pré-inscription</DialogTitle>
          <DialogDescription>Modifiez les informations de cette pré-inscription.</DialogDescription>
        </DialogHeader>
        {currentInscription && (
          <InscriptionFormUpdate currentInscription={currentInscription} actions={actions} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function NoInscriptions() {
  return <div className="py-8 text-center text-gray-500">Aucune pré-inscription à afficher</div>
}
