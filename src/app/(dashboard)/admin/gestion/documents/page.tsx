'use client'

import { FilePlus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DocumentForm } from '@/components/forms/document-form'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DocumentEntity } from '@/core/domain/entities/document.entity'
import { createClient } from '@/core/infrastructure/supabase/clients/client'
import { deleteDocument } from '@/core/presentation/actions/documents/delete'
import useDocuments from '@/core/presentation/hooks/documents/useDocuments'

export default function DocumentsPage() {
  const { documents, isLoading, refetch } = useDocuments()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDocument, setCurrentDocument] = useState<DocumentEntity | null>(null)

  const actions = {
    edit: (document: DocumentEntity) => {
      setCurrentDocument(document)
      setIsDialogOpen(true)
    },
    success: () => {
      setIsDialogOpen(false)
      setCurrentDocument(null)
      refetch()
    },
    cancel: () => {
      setIsDialogOpen(false)
      setCurrentDocument(null)
    },
    delete: async (id: string) => {
      await deleteDocument(id)
      refetch()
      toast.success('Document supprimé avec succès.')
    },
    openChange: (open: boolean) => {
      setIsDialogOpen(open)
      setCurrentDocument(null)
    },
    downloadFile: async (path: string, fileName: string) => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.storage.from('documents').download(path)
        if (error) throw error
        const blob = data
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Erreur lors du téléchargement :', error)
        throw new Error('Erreur lors du téléchargement', { cause: error })
      }
    },
    formatDate(date: Date): string {
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date)
    },
  }

  return (
    <div className="space-y-6">
      <H1 className="m-0 mx-auto mb-10">Gestion des documents</H1>
      <div className="flex w-full justify-end gap-2">
        <DocumentDialog isOpen={isDialogOpen} actions={actions} currentDocument={currentDocument} />
      </div>
      {isLoading ? <Loading /> : <DocumentTable documents={documents ?? []} actions={actions} />}
    </div>
  )
}

function DocumentDialog({
  isOpen,
  actions,
  currentDocument,
}: Readonly<{
  isOpen: boolean
  actions: {
    success: () => void
    openChange: (open: boolean) => void
    edit: (document: DocumentEntity) => void
    delete: (id: string, fileUrl: string) => void
    cancel: () => void
  }
  currentDocument: DocumentEntity | null
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={actions.openChange}>
      <DialogTrigger asChild>
        <Button>
          <FilePlus className="mr-2 h-4 w-4" />
          Nouveau document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {currentDocument ? 'Modifier le document' : 'Ajouter un document'}
          </DialogTitle>
          <DialogDescription>
            Téléchargez un document à partager avec les membres.
          </DialogDescription>
        </DialogHeader>
        <DocumentForm actions={actions} currentDocument={currentDocument} />
      </DialogContent>
    </Dialog>
  )
}

function DocumentTable({
  documents,
  actions,
}: Readonly<{
  documents: DocumentEntity[]
  actions: {
    edit: (document: DocumentEntity) => void
    delete: (id: string, fileUrl: string) => void
    downloadFile: (path: string, fileName: string) => void
    formatDate: (date: Date) => string
  }
}>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date d&apos;ajout</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center">
                Aucun document trouvé
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => {
              const fileName = doc.url.split('/documents/')[1]
              if (!fileName) return null
              return (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>{doc.description.slice(0, 50)}...</TableCell>
                  <TableCell>{actions.formatDate(new Date(doc.created_at))}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => actions.downloadFile(fileName, doc.title)}
                      >
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => actions.edit(doc)}>
                        Modifier
                      </Button>
                      <AlertDialogConfirm
                        title="Êtes-vous sûr de vouloir supprimer ce document ?"
                        description="Cette action est irréversible."
                        onConfirm={() => actions.delete(doc.id, doc.url)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
