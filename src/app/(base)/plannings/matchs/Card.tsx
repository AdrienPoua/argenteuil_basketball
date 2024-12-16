"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, ClockIcon, HomeIcon, PlaneIcon } from 'lucide-react'
import { z } from "zod"
import Image from "next/image"

const matchSchema = z.object({
  id: z.number(),
  numero: z.number(),
  numeroJournee: z.number(),
  idPoule: z.number(),
  idOrganismeEquipe1: z.number().nullable(),
  idOrganismeEquipe2: z.number().nullable(),
  nomEquipe1: z.string().nullable(),
  nomEquipe2: z.string().nullable(),
  resultatEquipe1: z.number().nullable(),
  resultatEquipe2: z.number().nullable(),
  date: z.date(),
  salle: z.string(),
  penaliteEquipe1: z.boolean(),
  penaliteEquipe2: z.boolean(),
  forfaitEquipe1: z.boolean(),
  forfaitEquipe2: z.boolean(),
  defautEquipe1: z.boolean(),
  defautEquipe2: z.boolean(),
  validee: z.boolean(),
  remise: z.boolean(),
  joue: z.boolean(),
  handicap1: z.number().nullable(),
  handicap2: z.number().nullable(),
  dateSaisieResultat: z.string().nullable(),
  creation: z.string(),
  modification: z.string().nullable(),
  classementPouleAssociee: z.number().nullable(),
  competition: z.string(),
})

type Match = z.infer<typeof matchSchema>

const HOME_TEAM_ID = 11851
const DEFAULT_TIME = "00:00"

interface BasketMatchCardProps {
  match: Match
  className?: string
}

export default function BasketMatchCard({ match, className }: Readonly<BasketMatchCardProps>) {
  const isHomeGame = match.idOrganismeEquipe1 === HOME_TEAM_ID
  const isDefaultMatch = formatTime(match.date) === DEFAULT_TIME


  return (
    <Card className={`w-full max-w-md mx-auto text-black p-3 ${className} ${getBorderClass(isHomeGame)} relative overflow-hidden`}>
      {match.remise && (
        <Image src="/images/divers/report.png" alt="Remise" className="object-cover absolute bottom-0 left-50 transform " width={1000} height={1000} />
      )}
      <CardHeader className="pb-2">
        <CompetitionBadge competition={match.competition} />
        <LocationIndicator isHomeGame={isHomeGame} />
        <OpponentName match={match} isHomeGame={isHomeGame} />
        <MatchInfo journee={match.numeroJournee} numero={match.numero} />
      </CardHeader>
      <CardContent className="pb-2">
        <MatchDetails match={match} isDefaultMatch={isDefaultMatch} />
      </CardContent>
      <CardFooter className="pt-2 flex flex-wrap gap-2 justify-center">
        <MatchStatus match={match} />
      </CardFooter>
    </Card>
  )
}

function CompetitionBadge({ competition }: Readonly<{ competition: string }>) {
  return (
    <Badge className="w-full justify-center mb-2">
      {competition}
    </Badge>
  )
}

function LocationIndicator({ isHomeGame }: Readonly<{ isHomeGame: boolean }>) {
  const Icon = isHomeGame ? HomeIcon : PlaneIcon
  const text = isHomeGame ? "Domicile" : "Extérieur"
  const colorClass = isHomeGame ? 'text-primary' : 'text-green-500'

  return (
    <div className={`flex items-center justify-center mb-2 ${colorClass}`}>
      <Icon className="mr-2" />
      <span className="font-semibold">{text}</span>
    </div>
  )
}

function OpponentName({ match, isHomeGame }: Readonly<{ match: Match, isHomeGame: boolean }>) {
  const opponentName = isHomeGame ? match.nomEquipe2 : match.nomEquipe1

  return (
    <CardTitle className="text-lg font-bold text-center">
      {opponentName}
    </CardTitle>
  )
}

function MatchInfo({ journee, numero }: Readonly<{ journee: number, numero: number }>) {
  return (
    <div className="text-sm text-center text-muted-foreground">
      Journée {journee} - Match n°{numero}
    </div>
  )
}

function MatchDetails({ match, isDefaultMatch }: Readonly<{ match: Match, isDefaultMatch: boolean }>) {
  return (
    <div className="flex flex-col space-y-2">
      <DetailRow
        Icon={CalendarIcon}
        content={isDefaultMatch ? "❓" : formatDate(match.date)}
      />
      <DetailRow
        Icon={ClockIcon}
        content={isDefaultMatch ? "--:--" : formatTime(match.date)}
      />
      <DetailRow
        Icon={MapPinIcon}
        content={isDefaultMatch ? "❓" : match.salle}
      />
      {match.joue && <MatchResult match={match} />}
    </div>
  )
}

function DetailRow({ Icon, content }: Readonly<{ Icon: React.ElementType, content: string }>) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">{content}</span>
    </div>
  )
}

function MatchResult({ match }: Readonly<{ match: Match }>) {
  const isHomeGame = match.idOrganismeEquipe1 === HOME_TEAM_ID
  const homeScore = isHomeGame ? match.resultatEquipe1 : match.resultatEquipe2
  const awayScore = isHomeGame ? match.resultatEquipe2 : match.resultatEquipe1

  const homeWin = homeScore !== null && awayScore !== null && homeScore > awayScore
  const homeScoreClass = isHomeGame ? (homeWin ? "text-green-600" : "text-red-600") : (homeWin ? "text-red-600" : "text-green-600")
  const awayScoreClass = isHomeGame ? (homeWin ? "text-red-600" : "text-green-600") : (homeWin ? "text-green-600" : "text-red-600")

  return (
    <div className="text-center font-bold mt-2 text-lg">
      <span className={homeScoreClass}>{homeScore}</span>
      {" - "}
      <span className={awayScoreClass}>{awayScore}</span>
    </div>
  )
}

function MatchStatus({ match }: Readonly<{ match: Match }>) {
  if (match.forfaitEquipe1) return <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>
  if (match.forfaitEquipe2) return <Badge variant="destructive">Forfait {match.nomEquipe2}</Badge>
  if (!match.joue && !match.remise) return <Badge>À venir</Badge>
  return null
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getBorderClass(isHomeGame: boolean): string {
  return isHomeGame ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-green-500'
}

