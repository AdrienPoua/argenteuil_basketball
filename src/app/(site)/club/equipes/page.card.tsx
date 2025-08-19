'use client'

import { Clock, Users, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { Gymnase } from '@/core/domain/entities/gymnase.entity'
import type { TeamEntity } from '@/core/domain/entities/team.entity'
import { cn } from '@/core/shared/utils/cn'

type Team = ReturnType<TeamEntity['toObject']>

type TeamCardProps = {
  team: Team
  gymnases: Gymnase[]
}

export function TeamCard({ team, gymnases }: Readonly<TeamCardProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative size-full">
      <button
        className={cn(
          'flex size-full min-w-full cursor-pointer flex-col rounded-2xl',
          'group overflow-hidden',
          'bg-white shadow-lg',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={cn('relative h-[20rem] min-h-[20rem] w-full overflow-hidden')}>
          <Image
            src={team.image || '/images/default/coach.avif'}
            alt={team.name}
            width={1000}
            height={1000}
            className="size-full min-h-full min-w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
          <h3 className="absolute bottom-4 left-4 right-4 mb-2 line-clamp-2 text-xl font-bold text-white">
            {team.name}
          </h3>
        </div>

        {/* Content - using flex-1 to push footer to bottom */}
        <div className="flex flex-1 flex-col p-6">
          {/* Categories and Level */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {team.category.join(' & ')}
            </Badge>
            <Badge className="text-xs">{team.gender}</Badge>
            <Badge className="text-xs">{team.level}</Badge>
          </div>

          {/* Sessions - flex-1 to take available space */}
          <div className="mb-4 flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-medium text-background">Entraînements</span>
            </div>
            <div className={cn('space-y-1')}>
              {team.sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-lg bg-muted-foreground/10 px-3 py-2 font-secondary text-sm text-background"
                >
                  <span className="font-medium">{session.day} -</span>
                  <span className="ml-2">
                    {session.start} - {session.end}
                  </span>
                  <span className="ml-2">
                    - {gymnases.find((gymnase) => gymnase.id === session.gymnase_id)?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed footer positioning with mt-auto */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-primary">Encadrement</span>
            </div>
            <div className="flex -space-x-2">
              {team.coachs.slice(0, 3).map((coach) => (
                <Avatar
                  key={coach.id}
                  className="h-10 w-10 border-2 border-background md:h-12 md:w-12"
                >
                  <AvatarImage src={coach.image || '/images/logo.png'} className="object-cover" />
                  <AvatarFallback className="text-xs">{coach.first_name?.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {team.coachs.length > 3 && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted md:h-12 md:w-12">
                  <span className="text-xs text-muted-foreground">+{team.coachs.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
      <CustomDialog team={team} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

const CustomDialog = ({
  team,
  isModalOpen,
  setIsModalOpen,
}: {
  team: Team
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="overflow-hidden rounded-xl border-none p-0">
        <div className="relative">
          <div className="relative">
            <Image
              src={team.image || '/images/default/equipes.avif'}
              alt={team.name}
              width={1500}
              height={1500}
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
