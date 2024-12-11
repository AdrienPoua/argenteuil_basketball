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
}

export default function MatchCard({ match }: Readonly<{ match: MatchData }>) {
  const formattedDate = new Date(match.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const formattedTime = match.horaire ? 
    new Date(0, 0, 0, Math.floor(match.horaire / 60), match.horaire % 60).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Heure non définie'

  return (
    <Card className="w-full max-w-md mx-auto text-black">
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
        <Badge variant={match.joue ? "default" : "outline"}>
          {match.joue ? "Joué" : "Non joué"}
        </Badge>
        <Badge variant={match.validee ? "default" : "outline"}>
          {match.validee ? "Validé" : "Non validé"}
        </Badge>
        {match.remise && <Badge variant="destructive">Remis</Badge>}
      </CardFooter>
    </Card>
  )
}

