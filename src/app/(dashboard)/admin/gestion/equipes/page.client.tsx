'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { TeamForm } from '@/components/forms/team-form'
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
import { GymnaseEntity } from '@/core/domain/entities/gymnase.entity'
import { MemberEntity } from '@/core/domain/entities/member.entity'
import { TeamEntity } from '@/core/domain/entities/team.entity'
import { deleteTeam } from '@/core/presentation/actions/teams/delete'
import { useGymnases } from '@/core/presentation/hooks/gymnases/useGymnases'
import { useMembers } from '@/core/presentation/hooks/members/useMembers'
import { useTeams } from '@/core/presentation/hooks/teams/useTeams'

type Competition = {
  id: number
  label: string
  poules: {
    id: number
    nom: string
  }[]
}

type PropsType = {
  competitions: Competition[]
}

export default function Index({ competitions }: Readonly<PropsType>) {
  const { teams, isLoading, refetch } = useTeams()
  const { members, isLoading: isMembersLoading } = useMembers()
  const { gymnases, isLoading: isGymnasesLoading } = useGymnases()
  const [filteredTeams, setFilteredTeams] = useState<TeamEntity[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTeam, setCurrentTeam] = useState<TeamEntity | null>(null)

  const actions = {
    edit: (team: TeamEntity) => {
      setCurrentTeam(team)
      setIsDialogOpen(true)
    },
    onSuccess: () => {
      setIsDialogOpen(false)
      setCurrentTeam(null)
      refetch()
    },
    onCancel: () => {
      setIsDialogOpen(false)
      setCurrentTeam(null)
    },
    delete: async (id: string) => {
      await deleteTeam(id)
      refetch()
      toast.success('Équipe supprimée avec succès.')
    },
    openChange: (open: boolean) => {
      setIsDialogOpen(open)
      setCurrentTeam(null)
    },
  }

  return (
    <div className="space-y-6">
      <H1 className="m-0 mx-auto mb-10">Gestion des équipes</H1>
      <div className="flex w-full justify-end gap-2">
        {!isMembersLoading && !isGymnasesLoading ? (
          <TeamDialog
            isOpen={isDialogOpen}
            actions={actions}
            currentTeam={currentTeam}
            members={members ?? []}
            gymnases={gymnases ?? []}
            competitions={competitions}
          />
        ) : (
          <Loading />
        )}
      </div>

      <SearchBar
        searchKey={['name', 'category', 'gender', 'level']}
        allItems={teams ?? []}
        setState={setFilteredTeams}
        placeholder="Rechercher une équipe..."
      />

      {isLoading ? <Loading /> : <TeamTable teams={filteredTeams} actions={actions} />}
    </div>
  )
}

function TeamDialog({
  isOpen,
  actions,
  currentTeam,
  members,
  gymnases,
  competitions,
}: Readonly<{
  isOpen: boolean
  actions: {
    onSuccess: () => void
    onCancel: () => void
    openChange: (open: boolean) => void
  }
  currentTeam: TeamEntity | null
  members: MemberEntity[]
  gymnases: GymnaseEntity[]
  competitions: Competition[]
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={actions.openChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle équipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{currentTeam ? "Modifier l'équipe" : 'Ajouter une équipe'}</DialogTitle>
          <DialogDescription>Créez ou modifiez une équipe du club.</DialogDescription>
        </DialogHeader>
        <TeamForm
          actions={actions}
          currentTeam={currentTeam}
          coachs={members}
          gymnases={gymnases}
          competitions={competitions}
        />
      </DialogContent>
    </Dialog>
  )
}

function TeamTable({
  teams,
  actions,
}: Readonly<{
  teams: TeamEntity[]
  actions: {
    edit: (team: TeamEntity) => void
    delete: (id: string) => void
  }
}>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="text-primary">
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Coach(s)</TableHead>
            <TableHead>Entrainements</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center">
                Aucune équipe trouvée
              </TableCell>
            </TableRow>
          ) : (
            teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.category.join(', ')}</TableCell>
                <TableCell>{team.level}</TableCell>
                <TableCell>
                  {team.coachs.map((coach) => `${coach.first_name} ${coach.last_name}`).join(', ')}
                </TableCell>
                <TableCell>
                  {team.sessions
                    .map((session) => `${session.day} ${session.start} - ${session.end}`)
                    .join(' | ')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => actions.edit(team)}>
                      Modifier
                    </Button>
                    <AlertDialogConfirm
                      title="Êtes-vous sûr de vouloir supprimer cette équipe ?"
                      description="Cette action est irréversible."
                      onConfirm={() => actions.delete(team.id)}
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
