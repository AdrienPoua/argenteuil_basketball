'use client'

import { Euro, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { TarifForm } from '@/components/forms/tarif-form'
import { AlertDialogConfirm } from '@/components/ui/alert-dialog-confirm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import H1 from '@/components/ui/H1'
import { Loading } from '@/components/ui/loading'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TarifEntity } from '@/core/domain/entities/tarif.entity'
import { toDomain } from '@/core/infrastructure/supabase/mappers/tarif.mapper'
import { deleteTarif } from '@/core/presentation/actions/tarifs/delete'
import { useTarifs } from '@/core/presentation/hooks/tarifs/useTarifs'

export default function TarifsPage() {
  const { tarifs: data, isLoading, refetch } = useTarifs()
  const tarifs = data?.map((tarif) => toDomain(tarif)) ?? []
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTarif, setCurrentTarif] = useState<TarifEntity | null>(null)

  const actions = {
    edit: (tarif: TarifEntity) => {
      setCurrentTarif(tarif)
      setIsDialogOpen(true)
    },
    success: () => {
      setIsDialogOpen(false)
      setCurrentTarif(null)
      refetch()
    },
    delete: async (id: string) => {
      await deleteTarif(id)
      refetch()
      toast.success('Tarif supprimé avec succès.')
    },
    openChange: (open: boolean) => {
      setIsDialogOpen(open)
      setCurrentTarif(null)
    },
  }

  return (
    <div className="space-y-6">
      <H1 className="m-0 mx-auto mb-10">Gestion des Tarifs</H1>

      <div className="flex w-full justify-end gap-2">
        <TarifDialog isOpen={isDialogOpen} actions={actions} currentTarif={currentTarif} />
      </div>

      {isLoading ? <Loading /> : <TarifsTable tarifs={tarifs ?? []} actions={actions} />}
    </div>
  )
}

function TarifDialog({
  isOpen,
  actions,
  currentTarif,
}: Readonly<{
  isOpen: boolean
  actions: {
    success: () => void
    openChange: (open: boolean) => void
  }
  currentTarif: TarifEntity | null
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={actions.openChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un tarif
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{currentTarif ? 'Modifier le tarif' : 'Ajouter un tarif'}</DialogTitle>
        </DialogHeader>
        <TarifForm actions={actions} currentTarif={currentTarif} />
      </DialogContent>
    </Dialog>
  )
}

function TarifsTable({
  tarifs,
  actions,
}: Readonly<{
  tarifs: TarifEntity[]
  actions: {
    edit: (tarif: TarifEntity) => void
    delete: (id: string) => void
  }
}>) {
  if (!tarifs || tarifs.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        Aucun tarif trouvé. Créez votre premier tarif !
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix de base</TableHead>
            <TableHead>Prix mutation</TableHead>
            <TableHead>Âge minimum</TableHead>
            <TableHead>Âge maximum</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tarifs.map((tarif) => (
            <TableRow key={tarif.id}>
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{tarif.category}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Euro className="h-4 w-4" />
                  {tarif.price.toFixed(2)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Euro className="h-4 w-4" />
                  {tarif.mutation_price.toFixed(2)}
                </div>
              </TableCell>
              <TableCell>{tarif.min_age}</TableCell>
              <TableCell>{tarif.max_age}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => actions.edit(tarif)}>
                    Modifier
                  </Button>
                  <AlertDialogConfirm
                    title="Supprimer ce tarif"
                    description="Cette action est irréversible. Le tarif sera définitivement supprimé."
                    onConfirm={() => actions.delete(tarif.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
