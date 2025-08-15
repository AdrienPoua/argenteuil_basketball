'use client'
import { Cell, flexRender, Header, HeaderGroup } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { AlertDialogConfirm } from '@/components/ui/alert-dialog-confirm'
import { Button } from '@/components/ui/button'
import { ModificationDialog } from './page.dialog.update'
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
  StatusFilterProps,
  useInscriptionActions,
  useInscriptionModal,
  usePreInscriptionsPage,
} from './page.hooks'
import { Table } from './page.table'

type PropsType = {
  inscriptions: InscriptionDTO[]
}

export default function PreInscriptionsPage({ inscriptions: data }: PropsType) {
  const inscriptions = useMemo(() => data.map((inscription) => toDomain(inscription)), [data])
  const { statusFilter, setStatusFilter, filteredData, table } = usePreInscriptionsPage({
    inscriptions,
  })
  const { isDialogOpen, currentInscription, modalActions } = useInscriptionModal()
  const { deleteAction } = useInscriptionActions()

  // État pour gérer le chargement du script Puppeteer
  const [loadingExtranet, setLoadingExtranet] = useState<string | null>(null)

  const handleExtranetAction = async (inscription: InscriptionEntity) => {
    setLoadingExtranet(inscription.id)
    try {
      toast.info('Lancement du script Extranet...')

      const payload = {
        firstName: inscription.firstName,
        lastName: inscription.lastName,
        email: inscription.email,
        dateOfBirth: inscription.dateOfBirth.toISOString(),
        gender: inscription.gender,
        surclassement: inscription.surclassement,
        typeInscription: inscription.typeInscription,
      }

      const result = await fillExtranetFormAction(payload)

      if (result.success) {
        toast.success('Succès')
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
          <Table table={table} actions={actions} loadingExtranet={loadingExtranet} />
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

function NoInscriptions() {
  return <div className="py-8 text-center text-gray-500">Aucune pré-inscription à afficher</div>
}
