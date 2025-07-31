'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { MemberForm } from '@/components/forms/member-form'
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
import { MemberEntity } from '@/core/domain/entities/member.entity'
import { deleteMember } from '@/core/presentation/actions/members/delete'
import { useMembers } from '@/core/presentation/hooks/members/useMembers'

export default function MembersPage() {
  const { members, isLoading, refetch } = useMembers()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<MemberEntity | null>(null)

  const actions = {
    edit: (member: MemberEntity) => {
      setCurrentMember(member)
      setIsDialogOpen(true)
    },
    success: () => {
      setIsDialogOpen(false)
      setCurrentMember(null)
      refetch()
    },
    delete: async (id: string) => {
      await deleteMember(id)
      refetch()
      toast.success('Membre supprimé avec succès.')
    },
    openChange: (open: boolean) => {
      setIsDialogOpen(open)
      setCurrentMember(null)
    },
  }

  return (
    <div className="space-y-6">
      <H1 className="m-0 mx-auto mb-10">Gestion des membres</H1>
      <div className="flex w-full justify-end gap-2">
        <MemberDialog isOpen={isDialogOpen} actions={actions} currentMember={currentMember} />
      </div>
      {isLoading ? <Loading /> : <MemberTable members={members ?? []} actions={actions} />}
    </div>
  )
}

function MemberDialog({
  isOpen,
  actions,
  currentMember,
}: Readonly<{
  isOpen: boolean
  actions: {
    success: () => void
    openChange: (open: boolean) => void
  }
  currentMember: MemberEntity | null
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={actions.openChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau membre
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentMember ? 'Modifier le membre' : 'Ajouter un membre'}</DialogTitle>
          <DialogDescription>Créez ou modifiez un membre du club.</DialogDescription>
        </DialogHeader>
        <MemberForm actions={actions} currentMember={currentMember} />
      </DialogContent>
    </Dialog>
  )
}

function MemberTable({
  members,
  actions,
}: Readonly<{
  members: MemberEntity[]
  actions: {
    edit: (member: MemberEntity) => void
    delete: (id: string) => void
  }
}>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center">
                Aucun membre trouvé
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.last_name}</TableCell>
                <TableCell>{member.first_name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.role.join(', ')}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => actions.edit(member)}>
                      Modifier
                    </Button>
                    <AlertDialogConfirm
                      title="Êtes-vous sûr de vouloir supprimer ce membre ?"
                      description="Cette action est irréversible."
                      onConfirm={() => actions.delete(member.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
