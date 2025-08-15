'use client'

import { CalendarOff, ChevronLeft, ChevronRight, Clock, MapPin, Trophy, Users } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import CallToAction from '@/components/ui/CallToAction'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import H1 from '@/components/ui/H1'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MatchEntity } from '@/core/domain/entities/match.entity'
import { toDomain, toPersistence } from '@/core/infrastructure/supabase/mappers/match.mapper'
import { formatShortDate } from '@/core/shared/utils/formatDate'
import { formatTime } from '@/core/shared/utils/formatTime'

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

export type PropsType = {
  matchs: ReturnType<typeof toPersistence>[]
}

const filterByMonth = (matchs: MatchEntity[], month: number) => {
  return matchs.filter((match) => {
    const monthOfMatch = parseInt(match.date.split('-')?.[1] ?? '0', 10)
    return monthOfMatch === month + 1
  })
}

export default function HomePage({ matchs: matchsObjects }: Readonly<PropsType>) {
  const matchs = matchsObjects.map((match) => toDomain(match))
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [currentMatchs, setCurrentMatchs] = useState<MatchEntity[]>(
    filterByMonth(matchs, currentMonth),
  )

  const previousMonth = () => {
    const newMonth = (currentMonth - 1 + 12) % 12
    setCurrentMonth(newMonth)
    setCurrentMatchs(filterByMonth(matchs, newMonth))
  }

  const nextMonth = () => {
    const newMonth = (currentMonth + 1) % 12
    setCurrentMonth(newMonth)
    setCurrentMatchs(filterByMonth(matchs, newMonth))
  }

  // Grouper les matchs par semaine
  const weeksData = groupMatchsByWeek(currentMatchs)
  const sortedWeeks = Object.keys(weeksData).sort((a, b) =>
    a.localeCompare(b, 'fr', { numeric: true }),
  )

  return (
    <div className="container mx-auto max-w-screen-xl space-y-6 px-4 sm:space-y-8 sm:px-6 lg:px-8">
      {/* Header */}
      <H1>Planning des Matchs</H1>

      {/* Navigation mensuelle */}
      <Card className="relative overflow-hidden p-0 shadow-lg">
        <CardHeader className="px-16 text-center sm:px-20 lg:px-24">
          <h2 className="mb-2 text-xl font-semibold text-primary sm:text-2xl lg:text-4xl">
            Planning de {MONTHS[currentMonth]?.toUpperCase()}
          </h2>
        </CardHeader>

        <Button
          onClick={previousMonth}
          className="primary absolute bottom-0 left-0 top-0 h-full w-16 rounded-r-lg lg:w-24"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 lg:size-full" />
        </Button>

        <Button
          onClick={nextMonth}
          className="primary absolute bottom-0 right-0 top-0 h-full w-16 rounded-l-lg lg:w-24"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 lg:size-full" />
        </Button>

        <CardContent className="text-center text-sm text-muted-foreground sm:text-base">
          {currentMatchs.length} match{currentMatchs.length > 1 ? 's' : ''} programmé
          {currentMatchs.length > 1 ? 's' : ''}
        </CardContent>
      </Card>

      {/* Planning par semaines */}
      {currentMatchs.length > 0 ? (
        <div className="space-y-4 sm:space-y-6">
          {sortedWeeks.map((weekStart) => {
            const weekmatchs = weeksData[weekStart]
            if (!weekmatchs) return null

            return (
              <WeekSection
                key={weekStart}
                weekStart={weekStart}
                matchs={weekmatchs
                  .slice()
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
              />
            )
          })}
        </div>
      ) : (
        <NoMatch />
      )}

      {/* Call to action */}
      <CallToAction
        title="Vous avez des questions ?"
        description="N'hésitez pas à nous contacter pour toute question concernant les horaires ou les lieux des matchs."
        className="mt-8 sm:mt-12"
      />
    </div>
  )
}

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-primary/20 bg-primary/10 p-6 text-center shadow-sm md:p-10">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary md:h-20 md:w-20">
        <CalendarOff className="h-8 w-8 md:h-10 md:w-10" />
      </div>
      <h2 className="text-xl font-bold text-primary md:text-2xl lg:text-3xl">Saison terminée</h2>
      <p className="max-w-xl text-base text-slate-700 md:text-lg">
        La saison est terminée, rendez-vous en septembre pour le début des championnats.
      </p>
    </div>
  )
}

// Grouper les matchs par semaine
const groupMatchsByWeek = (matchs: MatchEntity[]) => {
  const weeks: { [key: string]: MatchEntity[] } = {}

  matchs.forEach((match) => {
    const date = new Date(match.date)
    const startOfWeek = new Date(date)

    // Gérer le début de semaine (lundi)
    // Si c'est dimanche (0), on recule de 6 jours pour aller au lundi précédent
    // Sinon, on recule de (jour - 1) jours pour aller au lundi de la semaine
    const dayOfWeek = date.getDay()
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    startOfWeek.setDate(date.getDate() - daysToSubtract)

    const weekKey = startOfWeek.toISOString().split('T')[0]
    if (weekKey) {
      const existingWeek = weeks[weekKey] ?? []
      existingWeek.push(match)
      weeks[weekKey] = existingWeek
    }
  })

  return weeks
}

const MatchRow = ({ match }: { match: MatchEntity }) => {
  return (
    <>
      {/* Desktop view */}
      <TableRow className="hidden border-b transition-colors hover:bg-muted/50 lg:table-row">
        <TableCell className="py-4 font-medium">
          <div className="flex flex-col">
            <span className="font-semibold">{formatShortDate(match.date)}</span>
            <span className="mt-1 flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {formatTime(match.horaire)}
            </span>
          </div>
        </TableCell>

        <TableCell className="py-4">
          <Badge className="mb-1 w-fit text-sm" variant="default">
            {match.team?.name ?? '?'}
          </Badge>
        </TableCell>

        <TableCell className="py-4">
          <div className="flex flex-col">
            <Badge className="mb-1 w-fit text-sm" variant="secondary">
              {match.getOpponentName()}
            </Badge>
            {match.isAmical && (
              <div className="flex items-center gap-1">
                <Badge className="mb-1 w-fit">{match.getTeamName()}</Badge>
              </div>
            )}
          </div>
        </TableCell>

        <TableCell className="py-4">
          {match.isHomeTeam() ? (
            <Badge variant={match.isHomeTeam() ? 'default' : 'secondary'}>Domicile </Badge>
          ) : (
            <Badge variant="secondary">Extérieur</Badge>
          )}
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {match.salle}
          </div>
        </TableCell>

        <TableCell className="py-4 text-center">
          <div className="flex items-center justify-center">
            <Trophy className="mr-1 h-4 w-4 text-primary" />
            <span className="text-lg font-bold">
              {match.resultatEquipe1} - {match.resultatEquipe2}
            </span>
          </div>
        </TableCell>

        <TableCell className="py-4 text-sm text-muted-foreground">
          {[match.arbitre1, match.arbitre2].filter(Boolean).length > 0 && (
            <div>Arbitres: {[match.arbitre1, match.arbitre2].filter(Boolean).join(', ')}</div>
          )}
          {(match.chronometreur || match.marqueur) && (
            <div>OTM: {[match.chronometreur, match.marqueur].filter(Boolean).join(' - ')}</div>
          )}
        </TableCell>
      </TableRow>

      {/* Mobile view */}
      <TableRow className="lg:hidden">
        <TableCell colSpan={5} className="p-0">
          <div className="space-y-3 p-4">
            {/* Date et heure */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold">{formatShortDate(match.date)}</span>
                <span className="text-muted-foreground">à {formatTime(match.horaire)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold">
                  {match.resultatEquipe1} - {match.resultatEquipe2}
                </span>
              </div>
            </div>

            {/* Équipes */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {match.team && (
                  <Badge variant="default" className="text-xl">
                    {match.team.name}
                  </Badge>
                )}
                {match.isAmical && <Badge className="text-xs">{match.getTeamName()}</Badge>}
              </div>
              <Badge variant="secondary">{match.getOpponentName()}</Badge>
            </div>

            {/* Lieu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">{match.salle}</span>
              </div>
              {match.isHomeTeam() ? (
                <Badge>Domicile</Badge>
              ) : (
                <Badge variant="secondary">Extérieur</Badge>
              )}
            </div>

            {/* Officiels */}
            {([match.arbitre1, match.arbitre2].filter(Boolean).length > 0 ||
              match.chronometreur ||
              match.marqueur) && (
              <div className="space-y-1 text-xs text-muted-foreground">
                {[match.arbitre1, match.arbitre2].filter(Boolean).length > 0 && (
                  <div>Arbitres: {[match.arbitre1, match.arbitre2].filter(Boolean).join(', ')}</div>
                )}
                {(match.chronometreur || match.marqueur) && (
                  <div>
                    OTM: {[match.chronometreur, match.marqueur].filter(Boolean).join(' - ')}
                  </div>
                )}
              </div>
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}

const WeekSection = ({ weekStart, matchs }: { weekStart: string; matchs: MatchEntity[] }) => {
  const startDate = new Date(weekStart)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  const formatWeekRange = () => {
    const start = startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    const end = endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    return `: ${start} - ${end}`
  }

  return (
    <Card className="mb-4 border-primary/20 shadow-md sm:mb-6">
      <CardHeader className="custom-gradient py-2 text-background sm:py-3">
        <CardTitle className="flex items-center text-sm font-semibold sm:text-base lg:text-lg">
          <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Semaine du </span>
          <span className="sm:hidden">Sem. </span>
          {formatWeekRange()}
          <Badge variant="secondary" className="ml-auto bg-background/20 text-xs text-background">
            {matchs.length} match{matchs.length > 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="hidden lg:table-header-group">
              <TableRow className="bg-muted/30">
                <TableHead className="font-semibold">Date & Heure</TableHead>
                <TableHead className="font-semibold">Catégorie</TableHead>
                <TableHead className="font-semibold">Adversaire</TableHead>
                <TableHead className="font-semibold">Lieu & Salle</TableHead>
                <TableHead className="text-center font-semibold">Score</TableHead>
                <TableHead className="font-semibold">Officiels</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchs.map((match) => (
                <MatchRow key={match.id} match={match} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
