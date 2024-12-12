import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'

interface MatchData {
  id: number
  numero: number
  numeroJournee: number
  nomEquipe1: string
  nomEquipe2: string
  resultatEquipe1: number
  resultatEquipe2: number
  date: string
  horaire: number
  salle: {
    libelle: string
  }
  validee: boolean
  joue: boolean
  remise: boolean
  forfaitEquipe1: boolean,
  forfaitEquipe2: boolean,
}

export default function MatchCard({ match }: Readonly<{ match: MatchData }>) {
  const dateObj = new Date(match.date);

  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const horaireStr = String(match.horaire).padStart(4, '0'); // S'assurer qu'il a 4 chiffres
  const hours = parseInt(horaireStr.slice(0, 2), 10); // "20" → 20
  const minutes = parseInt(horaireStr.slice(-2), 10); // "00" → 0

  dateObj.setHours(hours, minutes, 0, 0); // heures, minutes, secondes, millisecondes


  const formattedTime = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`;


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
          <span>{match.salle?.libelle || 'Salle non définie'}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="staffCard" className={match.joue ? "bg-green-500" : "bg-red-500"}>
          {match.joue ? "Joué" : "Non joué"}
        </Badge>
        {match.remise && <Badge variant="destructive">Remis</Badge>}
        {match.forfaitEquipe1 && <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>}
        {match.forfaitEquipe2 && <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>}
      </CardFooter>
    </Card>
  )
}

