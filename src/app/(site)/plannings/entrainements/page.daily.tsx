'use client'

import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import PatternCardRound from '@/components/decorative/pattern-card-round'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/core/shared/utils/cn'
import { TeamType } from './page'

type PropsType = {
  teams: TeamType[]
}

export default function VueJour({ teams }: Readonly<PropsType>) {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const map = new Map<(typeof days)[number], TeamType[]>()
  const gymnase = new Map<string, string>([
    ['1', 'Jean Guimier'],
    ['2', 'Jesse Owens'],
  ])
  days.forEach((day) => {
    map.set(
      day,
      teams.filter((team) =>
        team.sessions.find((session) => session.day.toLowerCase() === day.toLowerCase()),
      ),
    )
  })

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base text-primary sm:text-lg">
            <Calendar className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Planning des Entraînements - Vue par jour</span>
            <span className="sm:hidden">Entraînements par jour</span>
          </CardTitle>
          <CardDescription className="text-sm">Sessions organisées par jour</CardDescription>
        </CardHeader>
      </Card>

      {days.map((day) => {
        return (
          <Card key={day}>
            <CardHeader className="p-4 pb-3 sm:p-6">
              <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                <span>{day}</span>
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {map.get(day)?.length} <span className="hidden sm:inline">entrainement(s)</span>
                  <span className="sm:hidden">entr.</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              {(map.get(day)?.length ?? 0 > 0) ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  {map.get(day)?.map((team) => (
                    <Card
                      key={team.id}
                      className={cn(
                        'relative overflow-hidden border-l-4 transition-transform duration-200 hover:scale-105 hover:shadow-md',
                      )}
                    >
                      <PatternCardRound topRight />
                      <CardContent className="p-3 sm:p-4">
                        <div className="space-y-2 sm:space-y-3">
                          {/* En-tête avec catégorie et genre */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <Badge className="text-xs">{team.category.join(' & ')}</Badge>
                            <Badge variant="secondary" className="text-xs">
                              {team.level}
                            </Badge>
                          </div>

                          {/* Nom de l'équipe */}
                          <div className="text-base font-semibold leading-tight sm:text-lg">
                            {team.name}
                          </div>

                          {/* Horaires */}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">
                              {team.sessions[0]?.start ?? ''} - {team.sessions[0]?.end ?? ''}
                            </span>
                          </div>

                          {/* Gymnase */}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">
                              {gymnase.get(team.sessions[0]?.gymnase_id ?? '') ?? ''}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <NoTraining />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const NoTraining = () => {
  return (
    <div className="py-8 text-center text-muted-foreground">
      <Users className="mx-auto mb-2 h-12 w-12 opacity-50" />
      <p>Aucun entraînement programmé</p>
    </div>
  )
}
