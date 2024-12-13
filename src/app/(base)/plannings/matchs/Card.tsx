"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'

interface Match {
  id: number;
  numero: number;
  numeroJournee: number;
  idPoule: number;
  idOrganismeEquipe1: number;
  idOrganismeEquipe2: number;
  nomEquipe1: string;
  nomEquipe2: string;
  resultatEquipe1: number;
  resultatEquipe2: number;
  date: Date;
  salle: string
  penaliteEquipe1: boolean;
  penaliteEquipe2: boolean;
  forfaitEquipe1: boolean;
  forfaitEquipe2: boolean;
  defautEquipe1: boolean;
  defautEquipe2: boolean;
  validee: boolean;
  remise: boolean;
  joue: boolean;
  handicap1: number | null;
  handicap2: number | null;
  dateSaisieResultat: string;
  creation: string;
  modification: string;
  classementPouleAssociee: number | null;
  competition: string;
}

export default function BasketMatchCard({ match }: Readonly<{ match: Match }>) {
  const formattedDate = match.date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const formattedTime = match.date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <Card className="w-full max-w-md mx-auto text-black p-3">
      <CardHeader className="pb-2">
        <Badge className="w-full justify-center">
          {match.competition}
        </Badge>
        <CardTitle className="text-lg font-bold text-center">
          {match.nomEquipe1} vs {match.nomEquipe2}
        </CardTitle>
        <div className="text-sm text-center text-muted-foreground">
          Journée {match.numeroJournee} - Match n°{match.numero}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formattedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{match.salle}</span>
          </div>
          {match.joue && (
            <div className="text-center font-bold mt-2">
              {match.resultatEquipe1} - {match.resultatEquipe2}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex flex-wrap gap-2 justify-center">
        {match.remise && <Badge variant="secondary">Remis</Badge>}
        {match.forfaitEquipe1 && <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>}
        {match.forfaitEquipe2 && <Badge variant="destructive">Forfait {match.nomEquipe2}</Badge>}
        {!match.joue && !match.remise && !match.forfaitEquipe1 && !match.forfaitEquipe2 && <Badge variant="outline">À venir</Badge>}
      </CardFooter>
    </Card>
  )
}
