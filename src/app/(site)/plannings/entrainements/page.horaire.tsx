'use client'

import { Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamType } from './page'

type PropsType = {
  teams: TeamType[]
}

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
        <div className="block sm:hidden space-y-4">
          {horaires.map((time) => (
            <MobileTimeSlot key={time} time={time} teams={teams} />
          ))}
        </div>
        
        {/* Vue desktop : grille */}
        <div className="hidden sm:block overflow-x-auto">
          <RowHeader />
          {horaires.map((time) => (
            <div key={time}>
              <Rows time={time} teams={teams} />
            </div>
          ))}
        </div>
      </CardContent>
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
              <Session key={team.id} team={team} day={day} time={time} />
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
      .map((team) => ({ team, day }))
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

  const gymnase = new Map<string, string>([
    ['1', 'Jean Guimier'],
    ['2', 'Jesse Owens'],
  ])

  const dayNames = {
    lundi: 'Lundi',
    mardi: 'Mardi', 
    mercredi: 'Mercredi',
    jeudi: 'Jeudi',
    vendredi: 'Vendredi',
    samedi: 'Samedi'
  }

  return (
    <div className="rounded border-l-4 border-secondary bg-primary/5 p-3 text-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-primary">{team.name}</span>
        <span className="text-xs text-muted-foreground">{dayNames[day as keyof typeof dayNames]}</span>
      </div>
      <div className="text-xs text-muted-foreground space-y-1">
        <div>{session?.start}-{session?.end}</div>
        <div className="italic">{gymnase.get(session.gymnase_id) ?? ''}</div>
      </div>
    </div>
  )
}

const Session = ({ team, day, time }: { team: TeamType; day: string; time: string }) => {
  const session = team.sessions.find((session) => {
    return session.day.toLowerCase() === day.toLowerCase() && session.start === time
  })

  if (!session) return null

  const gymnase = new Map<string, string>([
    ['1', 'Jean Guimier'],
    ['2', 'Jesse Owens'],
  ])

  return (
    <div
      key={team.id}
      className={`mb-1 rounded border-l-4 border-secondary bg-primary/10 p-2 text-xs text-primary transition-transform duration-200 hover:scale-105`}
    >
      <div className=" ">
        {team.name} -{' '}
        <span className="italic underline"> {gymnase.get(session.gymnase_id) ?? ''}</span>
      </div>
      <div className="text-xs opacity-75">
        {session?.start}-{session?.end}
      </div>
    </div>
  )
}
