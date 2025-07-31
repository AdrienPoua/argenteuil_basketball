'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { Badge, Loader2, Plus, RefreshCw } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { MatchForm } from '@/components/forms/match-form'
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
import { MatchEntity } from '@/core/domain/entities/match.entity'
import { TeamEntity } from '@/core/domain/entities/team.entity'
import { deleteMatch } from '@/core/presentation/actions/matchs/delete'
import { getMatchsFromExtranet } from '@/core/presentation/actions/matchs/readFromExtranet'
import { removeOldMatchs } from '@/core/presentation/actions/matchs/removeOldMatchs'
import { upsertFromExtranetToDatabase } from '@/core/presentation/actions/matchs/upsertFromExtranet'
import { useMatchs } from '@/core/presentation/hooks/matchs/useMatch'
import { useTeams } from '@/core/presentation/hooks/teams/useTeams'

export default function MatchsPage() {
  const { matchs, isLoading, refetch } = useMatchs()
  const { teams } = useTeams()
  const [filteredMatchs, setFilteredMatchs] = useState<MatchEntity[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMatch, setCurrentMatch] = useState<MatchEntity | null>(null)
  const [currentTeam, setCurrentTeam] = useState<TeamEntity | null>(null)
  const [loading, setLoading] = useState(false)

  const actions = {
    edit: (match: MatchEntity) => {
      setCurrentMatch(match)
      setCurrentTeam(teams?.find((team) => team.id === match.team?.id) ?? null)
      setIsDialogOpen(true)
    },
    success: () => {
      setIsDialogOpen(false)
      setCurrentMatch(null)
      setCurrentTeam(null)
      refetch()
    },
    delete: async (id: string) => {
      await deleteMatch(id)
      refetch()
      toast.success('Match supprimé avec succès.')
    },
    openChange: (open: boolean) => {
      setIsDialogOpen(open)
      if (!open) {
        setCurrentMatch(null)
        setCurrentTeam(null)
      }
    },
    getFromExtranet: async () => {
      setLoading(true)
      try {
        await getMatchsFromExtranet()
        toast.success("Matchs récupérés de l'extranet avec succès.")
      } catch (error) {
        console.error(error)
        toast.error('Erreur lors de la récupération des matchs.')
      } finally {
        setLoading(false)
      }
    },
    syncToDatabase: async () => {
      setLoading(true)
      try {
        await upsertFromExtranetToDatabase()
        await removeOldMatchs()
        refetch()
        toast.success('Matchs synchronisés vers la base de données.')
      } catch (error) {
        console.error(error)
        toast.error('Erreur lors de la synchronisation.')
      } finally {
        setLoading(false)
      }
    },
    formatHoraire: (horaire: number) => {
      if (horaire == 0) return '-'
      return horaire.toString().slice(0, 2) + ':' + horaire.toString().slice(2, 4)
    },
  }

  return (
    <div className="space-y-6">
      <H1 className="m-0 mx-auto mb-10">Gestion des matchs</H1>
      <div className="flex w-full justify-end gap-2">
        <Button disabled={loading} onClick={actions.syncToDatabase}>
          <RefreshCw className="mr-2 h-4 w-4" /> Rafraîchir
          {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
        <MatchDialog
          isOpen={isDialogOpen}
          actions={actions}
          currentMatch={currentMatch}
          currentTeam={currentTeam}
          teams={teams ?? []}
        />
      </div>

      <SearchBar
        allItems={matchs ?? []}
        setState={setFilteredMatchs}
        searchKey={['nomEquipe1', 'nomEquipe2', 'salle', 'date']}
        placeholder="Rechercher un match..."
      />

      {isLoading ? (
        <Loading />
      ) : (
        <MatchTable matchs={filteredMatchs} teams={teams ?? []} actions={actions} />
      )}
    </div>
  )
}

function MatchDialog({
  isOpen,
  actions,
  currentMatch,
  currentTeam,
  teams,
}: Readonly<{
  isOpen: boolean
  actions: {
    success: () => void
    openChange: (open: boolean) => void
  }
  currentMatch: MatchEntity | null
  currentTeam: TeamEntity | null
  teams: TeamEntity[]
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={actions.openChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau match
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentMatch ? 'Modifier le match' : 'Ajouter un match'}</DialogTitle>
          <DialogDescription>Créez ou modifiez un match.</DialogDescription>
        </DialogHeader>
        <MatchForm
          actions={actions}
          currentMatch={currentMatch ?? null}
          currentTeam={currentTeam}
          teams={teams}
        />
      </DialogContent>
    </Dialog>
  )
}

function MatchTable({
  matchs,
  teams,
  actions,
}: Readonly<{
  matchs: MatchEntity[]
  teams: TeamEntity[]
  actions: {
    edit: (match: MatchEntity) => void
    delete: (id: string) => void
    formatHoraire: (horaire: number) => string
  }
}>) {
  const tableRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: matchs.length,
    getScrollElement: () => tableRef.current,
    estimateSize: () => 72,
    overscan: 5,
  })

  if (matchs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground">Aucun match trouvé</div>
        <p className="mt-1 text-sm text-muted-foreground">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    )
  }

  return (
    <div className="border-t">
      {/* Header with proper column widths */}
      <div className="sticky top-0 z-10 grid grid-cols-12 gap-4 border-b bg-transparent px-4 py-3 text-sm font-medium text-muted-foreground">
        <div className="col-span-2 lg:col-span-1">
          Date
          <br /> <span className="text-xs text-muted-foreground">(AAAA-MM-JJ)</span>
        </div>
        <div className="col-span-1 hidden sm:block">Heure</div>
        <div className="col-span-3 lg:col-span-2">Équipe domicile</div>
        <div className="col-span-3 lg:col-span-2">Équipe extérieure</div>
        <div className="col-span-2 hidden lg:block">Championnat</div>
        <div className="col-span-1 hidden sm:block">Score</div>
        <div className="col-span-2 hidden md:block lg:col-span-1">Salle</div>
        <div className="col-span-1 lg:col-span-1">Actions</div>
      </div>

      {/* Virtualized content */}
      <div ref={tableRef} className="h-[600px] overflow-auto" style={{ contain: 'strict' }}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const match = matchs[virtualRow.index]
            if (!match) return null

            const team = teams.find((t) => t.id === match.team?.id)

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className="absolute left-0 top-0 w-full border-b transition-colors hover:bg-muted/50"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  height: '72px',
                }}
              >
                <div className="grid h-full grid-cols-12 items-center gap-4 px-4 py-4">
                  <div className="col-span-2 text-sm font-medium lg:col-span-1">{match.date}</div>
                  <div className="col-span-1 hidden text-sm sm:block">
                    {actions.formatHoraire(match.horaire)}
                  </div>
                  <div className="col-span-3 truncate text-sm font-medium lg:col-span-2">
                    {match.nomEquipe1}
                  </div>
                  <div className="col-span-3 truncate text-sm lg:col-span-2">
                    {match.nomEquipe2}
                  </div>
                  <div className="col-span-2 hidden lg:block">
                    <div className="flex flex-wrap gap-1">
                      {team?.competitions?.map((competition) => (
                        <Badge key={competition.id} className="text-xs">
                          {competition.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 hidden text-center text-sm sm:block">
                    {match.resultatEquipe1} - {match.resultatEquipe2}
                  </div>
                  <div className="col-span-2 hidden truncate text-sm md:block lg:col-span-1">
                    {match.salle}
                  </div>
                  <div className="col-span-1 lg:col-span-1">
                    <Button variant="outline" size="sm" onClick={() => actions.edit(match)}>
                      Modifier
                    </Button>
                  </div>
                  <AlertDialogConfirm
                    title="Êtes-vous sûr de vouloir supprimer ce match ?"
                    disabled={!match.isAmical}
                    description="Cette action est irréversible."
                    onConfirm={() => actions.delete(match.id)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
