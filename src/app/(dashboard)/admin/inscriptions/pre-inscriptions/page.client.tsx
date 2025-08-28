'use client'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
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
  StatusFilterProps,
  useInscriptionActions,
  useInscriptionModal,
  usePreInscriptionsPage,
} from './page.hooks'
import { Table } from './page.table'
import { updateInscription } from '@/core/presentation/actions/inscriptions/updateInscription'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

type PropsType = {
  inscriptions: InscriptionDTO[]
}

export default function PreInscriptionsPage({ inscriptions: data }: Readonly<PropsType>) {
  const inscriptions = useMemo(() => data.map((inscription) => toDomain(inscription)), [data])
  const { statusFilter, setStatusFilter, filteredData, table, filteredEmails } = usePreInscriptionsPage({
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
        id: inscription.id,
        firstName: inscription.firstName,
        lastName: inscription.lastName,
        email: inscription.email,
        dateOfBirth: inscription.dateOfBirth.toISOString(),
        gender: inscription.gender,
        surclassement: inscription.surclassement,
        typeInscription: inscription.typeInscription,
        passSport: inscription.passSport,
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

  const handleDoneAction = async (id: string) => {
    try {
      await updateInscription(id, {
        status: 'TRAITEE',
      })
    } catch (error) {
      const normalizedError = ErrorHandler.normalize(error)
      ErrorHandler.log(normalizedError)
      toast.error(ErrorHandler.userMessage(error))
    }
  }

  const handleCopyEmails = async () => {
    if (filteredEmails.length === 0) {
      toast.error('Aucune adresse email à copier')
      return
    }

    try {
      await navigator.clipboard.writeText(filteredEmails.join('; '))
      toast.success(`${filteredEmails.length} adresses email copiées dans le presse-papiers`)
    } catch (error) {
      toast.error('Erreur lors de la copie des emails')
      console.error('Failed to copy emails:', error)
    }
  }

  const actions = {
    edit: modalActions.edit,
    success: modalActions.success,
    delete: deleteAction,
    openChange: modalActions.openChange,
    extranet: handleExtranetAction,
    done: handleDoneAction,
  }
  return (
    <div className="rounded-lg pt-10 shadow">
      <div className="flex flex-col gap-4 border-b  border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold">Pré-inscriptions</h2>
        <CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Adhérents ({filteredData.length})
          </CardTitle>

          <Button
            onClick={handleCopyEmails}
            className="flex items-center gap-2"
            disabled={filteredEmails.length === 0}
          >
            <Copy className="h-4 w-4" />
            Copier les emails ({filteredEmails.length})
          </Button>
        </div>
      </CardHeader>
        <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>
      <div>
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

function StatusFilter({ statusFilter, setStatusFilter }: Readonly<StatusFilterProps>) {
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
