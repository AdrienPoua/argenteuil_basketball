'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { FaqForm } from '@/components/forms/faq-form'
import { AlertDialogConfirm } from '@/components/ui/alert-dialog-confirm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import H1 from '@/components/ui/H1'
import { Loading } from '@/components/ui/loading'
import { SearchBar } from '@/components/ui/searchBar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FaqEntity } from '@/core/domain/entities/faq.entity'
import { deleteFaq } from '@/core/presentation/actions/faq/delete'
import { useFaqs } from '@/core/presentation/hooks/faqs/useFaqs'

export default function FaqPage() {
  const { faqs, isLoading, refetch } = useFaqs()
  const [filteredFaqs, setFilteredFaqs] = useState<FaqEntity[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentFaq, setCurrentFaq] = useState<FaqEntity | null>(null)

  const actions = {
    edit: (faq: FaqEntity) => {
      setCurrentFaq(faq)
      setIsDialogOpen(true)
    },
    success: () => {
      setIsDialogOpen(false)
      setCurrentFaq(null)
      refetch()
    },
    delete: async (id: string) => {
      await deleteFaq(id)
      refetch()
      toast.success('Question supprimée avec succès.')
    },
    openChange: (open: boolean) => {
      setIsDialogOpen(open)
      setCurrentFaq(null)
    },
  }

  return (
    <div className="space-y-6">
      <H1 className="m-0 mx-auto mb-10">Gestion de la FAQ</H1>
      <div className="flex w-full justify-end gap-2">
        <FaqDialog isOpen={isDialogOpen} actions={actions} currentFaq={currentFaq} />
      </div>

      <SearchBar
        searchKey={['question', 'answer']}
        allItems={faqs ?? []}
        setState={setFilteredFaqs}
        placeholder="Rechercher dans les questions ou réponses..."
      />

      {isLoading ? <Loading /> : <FaqTable faqs={filteredFaqs} actions={actions} />}
    </div>
  )
}

function FaqDialog({
  isOpen,
  actions,
  currentFaq,
}: Readonly<{
  isOpen: boolean
  actions: {
    success: () => void
    openChange: (open: boolean) => void
  }
  currentFaq: FaqEntity | null
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={actions.openChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentFaq ? 'Modifier la question' : 'Ajouter une question'}</DialogTitle>
          <DialogDescription>
            {currentFaq
              ? 'Modifiez cette question fréquemment posée.'
              : 'Ajoutez une nouvelle question et sa réponse pour la FAQ.'}
          </DialogDescription>
        </DialogHeader>
        <FaqForm actions={actions} currentFaq={currentFaq} />
      </DialogContent>
    </Dialog>
  )
}

function FaqTable({
  faqs,
  actions,
}: Readonly<{
  faqs: FaqEntity[]
  actions: {
    edit: (faq: FaqEntity) => void
    delete: (id: string) => void
  }
}>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Réponse</TableHead>
            <TableHead>Ordre</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell className="font-medium">{faq.question}</TableCell>
              <TableCell className="line-clamp-1 max-w-[200px] truncate font-medium">
                {faq.answer}
              </TableCell>
              <TableCell className="font-medium">{faq.order}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => actions.edit(faq)}>
                    Modifier
                  </Button>
                  <AlertDialogConfirm
                    title="Êtes-vous sûr de vouloir supprimer cette question ?"
                    description="Cette action est irréversible."
                    onConfirm={() => actions.delete(faq.id)}
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
