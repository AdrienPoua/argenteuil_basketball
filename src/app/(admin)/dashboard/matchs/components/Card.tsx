"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'
import { PropsType, EditingCardPropsType } from "../types/card.types"
import Form from "./Form"

export default function Index({ match }: Readonly<PropsType>) {
    const [isEditing, setIsEditing] = useState(false)
    if (isEditing) {
        return <EditingCard match={match} setIsEditing={setIsEditing} />
    } else {
        return <BaseCard match={match} setIsEditing={setIsEditing} />
    }
}

const BaseCard = ({ match, setIsEditing }: Readonly<EditingCardPropsType>) => {
    return (
        <Card className="w-full max-w-md mx-auto text-black font-secondary p-3">
            <Badge variant="match">
                {match.competition}
            </Badge>
            <CardHeader className="flex flex-row items-center justify-between mb-3">
                <CardTitle className="text-lg w-full text-center mb">
                    Journée {match.matchNumberJournee} - Match n°{match.matchNumber}
                </CardTitle>
                <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(true)}>
                        Modifier
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="text-left font-semibold">{match.nomEquipe1}</div>
                    <div className="text-2xl font-bold">{match.resultatEquipe1 ?? '-'}</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-left font-semibold">{match.nomEquipe2}</div>
                    <div className="text-2xl font-bold">{match.resultatEquipe2 ?? '-'}</div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{match.formatedDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ClockIcon className="h-4 w-4" />
                    <span>{match.formatedTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{match.salle}</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-2">
                {match.remise && <Badge variant="destructive">Remis</Badge>}
                {match.forfaitEquipe1 && <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>}
                {match.forfaitEquipe2 && <Badge variant="destructive">Forfait {match.nomEquipe2}</Badge>}
            </CardFooter>
        </Card>
    )
}

const EditingCard = ({ match, setIsEditing }: Readonly<EditingCardPropsType>) => {
    return (
        <Card className="w-full max-w-md mx-auto text-black font-secondary p-3">
            <Form match={match} setIsEditing={setIsEditing} />
        </Card>
    )
}
