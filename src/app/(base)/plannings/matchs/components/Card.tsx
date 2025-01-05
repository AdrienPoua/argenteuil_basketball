"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, ClockIcon, HomeIcon, PlaneIcon } from 'lucide-react'
import Image from "next/image"
import Match from "@/models/Match"

type PropsType = { match: ReturnType<Match["toPlainObject"]> }

export default function BasketMatchCard({ match }: Readonly<PropsType>) {
  const isDefaultMatch = match.heure === "00:00"
  return (
    <Card className={`w-full max-w-md mx-auto text-black p-3 ${match.isHome ? "border-l-4 border-l-blue-500" : "border-l-4 border-l-green-500"} relative overflow-hidden`}>
      {match.remise && (
        <Image src="/images/divers/report.png" alt="Remise" className="object-cover absolute bottom-0 left-50 transform " width={1000} height={1000} />
      )}
      <CardHeader className="pb-2">
        <Badge className="w-full justify-center mb-2">
          {match.championnat}
        </Badge>
        <div className={`flex items-center justify-center mb-2 ${match.isHome ? "border-l-4 border-l-blue-500" : "border-l-4 border-l-green-500"}`}>
          {match.isHome ? <HomeIcon /> : <PlaneIcon />}
          <span className="font-semibold">{match.isHome ? match.nomEquipe2 : match.nomEquipe1}</span>
        </div>
        <CardTitle className="text-lg font-bold text-center">
          {match.isHome ? match.nomEquipe2 : match.nomEquipe1}
        </CardTitle>
        <div className="text-sm text-center text-muted-foreground">
          Journée {match.matchNumberJournee} - Match n°{match.matchNumber}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{match.date.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{isDefaultMatch ? "--:--" : match.formatedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{isDefaultMatch ? "❓" : match.salle}</span>
          </div>
          <div className="text-center font-bold mt-2 text-lg">
            <span>{match.resultatEquipe1}</span>
            {" - "}
            <span>{match.resultatEquipe2}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex flex-wrap gap-2 justify-center">
        if (match.forfaitEquipe1) return <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>
        if (match.forfaitEquipe2) return <Badge variant="destructive">Forfait {match.nomEquipe2}</Badge>
      </CardFooter>
    </Card>
  )
}



