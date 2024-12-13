import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'

type Match = {
  id: number;
  numero: number;
  numeroJournee: number;
  idPoule: number;
  idOrganismeEquipe1: number;
  idOrganismeEquipe2: number;
  nomEquipe1: string;
  nomEquipe2: string;
  idEngagementEquipe1: number;
  idEngagementEquipe2: number;
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
  dateSaisieResultat: string; // ISO 8601
  creation: string; // ISO 8601
  modification: string; // ISO 8601
  classementPouleAssociee: number | null;
};

export default function MatchCard({ match }: Readonly<{ match: Match }>) {

  const formattedDate = match.date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const formattedTime = `${String(match.date.getHours()).padStart(2, '0')}:${String(match.date.getMinutes()).padStart(2, '0')}`;


  return (
    <Card className="p-5 text-black font-secondary">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-center">
          Journée {match.numeroJournee} - Match n°{match.numero}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-left font-semibold">{match.nomEquipe1}</div>
          <div className="text-2xl font-bold">{match.resultatEquipe1}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-left font-semibold">{match.nomEquipe2}</div>
          <div className="text-2xl font-bold">{match.resultatEquipe2}</div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          <span>{formattedTime}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPinIcon className="h-4 w-4" />
          <span>{match.salle}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="staffCard" className={match.joue ? "bg-green-500" : "bg-primary"}>
          {match.joue ? "Joué" : "Non joué"}
        </Badge>
        {match.remise && <Badge variant="destructive">Remis</Badge>}
        {match.forfaitEquipe1 && <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>}
        {match.forfaitEquipe2 && <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>}
      </CardFooter>
    </Card>
  )
}

