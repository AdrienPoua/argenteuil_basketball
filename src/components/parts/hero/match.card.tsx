'use client'

import { cn } from '@/utils/cn'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/formatDate'
import { toDomain } from '@/mappers/match.mapper'
import { MatchDTO } from '@/core/infrastructure/supabase/dtos/match.dto'

type PropsType = {
  match: MatchDTO
}

export default function MatchCard({ match: data }: Readonly<PropsType>) {
  const match = toDomain(data)
  const { date, horaire, nomEquipe1, nomEquipe2, salle } = match

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 p-4',
        'overflow-hidden rounded-lg border border-primary bg-background shadow-md',
        'hover:scale-102 transition-all duration-200 hover:border-foreground hover:bg-primary/5',
        'group cursor-pointer',
      )}
    >
      <div className="w-full rounded-md bg-foreground p-3 text-center text-lg font-medium text-background">
        {formatDate(date)} • {horaire}
      </div>

      <div className="grid w-full grid-cols-3 items-center gap-2 px-2 sm:gap-4 sm:px-4 md:gap-6 md:px-8">
        <TeamSquare>{nomEquipe1}</TeamSquare>
        <div className="flex flex-col items-center justify-center gap-2 py-2">
          <Badge
            variant="staffCard"
            className="text-center text-xs font-semibold uppercase tracking-wide md:text-lg lg:text-xl"
          >
            {match.team?.name}
          </Badge>
          <p className="text-lg font-bold sm:text-xl">VS</p>
        </div>
        <TeamSquare>{nomEquipe2}</TeamSquare>
      </div>

      {salle && (
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            📍 {salle}
          </p>
        </div>
      )}
    </div>
  )
}

const TeamSquare = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      className={cn(
        'flex aspect-square min-h-16 flex-col items-center justify-center p-2 sm:min-h-20 md:min-h-24 md:p-4',
        'rounded-lg border-2 border-primary bg-background',
        'transition-all duration-200 group-hover:border-foreground group-hover:bg-primary/5',
        'text-center text-xs font-medium sm:text-sm md:text-base lg:text-xl',
      )}
    >
      {children}
    </div>
  )
}
