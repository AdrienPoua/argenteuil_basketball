'use client'

import { Clock } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TeamType } from './page'
import { Badge } from '@/components/ui/badge'

type PropsType = {
  teams: TeamType[]
}

const gymnases = new Map<string, string>([
  ['1', 'Jean Guimier'],
  ['2', 'Jesse Owens'],
  ['3', 'Henri Wallon'],
])

export default function VueHoraire({ teams }: Readonly<PropsType>) {
  const uniquesHoraires = new Set<string>()
  for (const team of teams) {
    for (const session of team.sessions ?? []) {
      uniquesHoraires.add(session.start)
    }
  }
  const horaires = Array.from(uniquesHoraires).sort((a, b) => a.localeCompare(b))
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-base sm:text-lg">Planning horaire</span>
        </CardTitle>
        <CardDescription className="text-sm">Planning horaire des entraînements</CardDescription>
      </CardHeader>
      <CardContent className="p-2 sm:p-6">
        {/* Vue mobile : liste verticale */}
        <div className="block space-y-4 sm:hidden">
          {horaires.map((time) => (
            <MobileTimeSlot key={time} time={time} teams={teams} />
          ))}
        </div>

        {/* Vue desktop : grille */}
        <div className="hidden overflow-x-auto sm:block">
          <RowHeader />
          {horaires.map((time) => (
            <div key={time}>
              <Rows time={time} teams={teams} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 bg-primary/10 p-4">
        <div>
          <span className="font-bold">Jean Guimier</span> : 2 rue jean de la fontaine, 95100
          Argenteuil, <span className="italic">01.39.82.23.13</span>
        </div>
        <div>
          <span className="font-bold">Jesse Owens</span> : 120 rue de rochefort, 95100 Argenteuil,
          <span className="italic"> 01.39.80.78.20</span>
        </div>
        <div>
          <span className="font-bold">Henri Wallon</span> : 20 bd de la résistance, 95100
          Argenteuil, <span className="italic">01.39.80.78.20</span>
        </div>
      </CardFooter>
    </Card>
  )
}

const RowHeader = () => {
  return (
    <div className="mb-2 grid grid-cols-7 gap-1">
      <div className="rounded bg-primary/10 p-2 text-center text-sm font-medium">Heure</div>
      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((day) => (
        <div key={day} className="rounded bg-primary/10 p-2 text-center text-sm font-medium">
          {day}
        </div>
      ))}
    </div>
  )
}

const Rows = ({ time, teams }: { time: string; teams: TeamType[] }) => {
  return (
    <div key={time} className="mb-1 grid grid-cols-7 gap-1">
      <div className="rounded bg-primary/10 p-2 text-center text-sm font-medium">{time}</div>
      {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'].map((day) => {
        const teamWithSession = teams.filter((team) =>
          team.sessions.find(
            (session) => session.day.toLowerCase() === day.toLowerCase() && session.start === time,
          ),
        )
        return (
          <div key={day}>
            {teamWithSession.map((team) => (
              <SessionCard key={team.id} team={team} day={day} time={time} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

const MobileTimeSlot = ({ time, teams }: { time: string; teams: TeamType[] }) => {
  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
  const sessionsForTime = days.flatMap((day) =>
    teams
      .filter((team) =>
        team.sessions.find(
          (session) => session.day.toLowerCase() === day.toLowerCase() && session.start === time,
        ),
      )
      .map((team) => ({ team, day })),
  )

  if (sessionsForTime.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 font-medium text-primary">
        <Clock className="h-4 w-4" />
        <span>{time}</span>
      </div>
      <div className="space-y-2 pl-6">
        {sessionsForTime.map(({ team, day }) => (
          <MobileSession key={`${team.id}-${day}`} team={team} day={day} time={time} />
        ))}
      </div>
    </div>
  )
}

const MobileSession = ({ team, day, time }: { team: TeamType; day: string; time: string }) => {
  const session = team.sessions.find((session) => {
    return session.day.toLowerCase() === day.toLowerCase() && session.start === time
  })

  if (!session) return null

  const dayNames = {
    lundi: 'Lundi',
    mardi: 'Mardi',
    mercredi: 'Mercredi',
    jeudi: 'Jeudi',
    vendredi: 'Vendredi',
    samedi: 'Samedi',
  }

  return (
    <div className="rounded border-l-4 border-secondary bg-primary/5 p-3 text-sm">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium text-primary">{team.name}</span>
        <span className="text-xs text-muted-foreground">
          {dayNames[day as keyof typeof dayNames]}
        </span>
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <div>
          {session?.start}-{session?.end}
        </div>
        <div className="italic">{gymnases.get(session.gymnase_id) ?? ''}</div>
      </div>
    </div>
  )
}

const SessionCard = ({ team, day, time }: { team: TeamType; day: string; time: string }) => {
  const session = team.sessions.find((session) => {
    return session.day.toLowerCase() === day.toLowerCase() && session.start === time
  })

  if (!session) return null

  return (
    <div
      key={team.id}
      className={`mb-1 rounded border-l-4 border-secondary bg-primary/10 p-2 text-xs text-primary transition-transform duration-200 hover:scale-105`}
    >
      <div className="flex flex-col items-center justify-between gap-1">
        <Badge className="w-full justify-center px-3 py-0.5 text-xs">{team.name}</Badge>
        <div className="text-center text-xs font-bold underline underline-offset-2">
          {session?.start}-{session?.end}
        </div>
        <div className=""> {gymnases.get(session.gymnase_id) ?? ''}</div>
      </div>
    </div>
  )
}
