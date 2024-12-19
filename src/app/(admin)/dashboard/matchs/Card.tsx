"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteMatch, updateMatch } from "@/database/controllers/matchs";
import { z } from "zod";

const matchSchema = z.object({
    id: z.number(),
    numero: z.number(),
    numeroJournee: z.number(),
    idPoule: z.number(),
    idOrganismeEquipe1: z.number(),
    idOrganismeEquipe2: z.number(),
    nomEquipe1: z.string(),
    nomEquipe2: z.string(),
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
});

type Match = z.infer<typeof matchSchema>;



export default function MatchCard({ match: initialMatch }: Readonly<{ match: Match }>) {
    const [isEditing, setIsEditing] = useState(false)
    const [match, setMatch] = useState<Match>(initialMatch)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const formattedDate = match.date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const formattedTime = match.date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris'
    })

    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const [datePart, timePart] = value.split('T');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        const newDate = new Date(year, month - 1, day, hours, minutes);
        setMatch(prev => ({ ...prev, date: newDate }));
    };

    const handleConfirm = () => {
        updateMatch(match)
        setIsEditing(false)
    }

    const handleDelete = () => {
        deleteMatch(match)
        setIsDeleteDialogOpen(false)
    }

    return (
        <Card className="w-full max-w-md mx-auto text-black font-secondary p-3">
            <Badge variant="match">
                {match.competition}
            </Badge>
            <CardHeader className="flex flex-row items-center justify-between mb-3">
                <CardTitle className="text-lg w-full text-center mb">
                    Journée {match.numeroJournee} - Match n°{match.numero}
                </CardTitle>
                {!isEditing && (
                    <div className="flex gap-2">
                        <Button onClick={() => setIsEditing(true)} className={match.joue ? "hidden" : "bg-primary"}>
                            Modifier
                        </Button>
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce match ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. Cela supprimera définitivement le match de la base de données.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Confirmer</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {isEditing ? (
                    <>
                        <div className="space-y-2">
                            <div className="font-semibold text-md">Équipe A - {match.nomEquipe1} - {match.resultatEquipe1}</div>
                        </div>
                        <div className="space-y-2 flex justify-start items-center gap-3">
                            <div className="font-semibold text-md">Équipe B - {match.nomEquipe2} - {match.resultatEquipe2}</div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="datetime">Date et Heure</Label>
                            <Input
                                id="datetime"
                                name="datetime"
                                type="datetime-local"
                                value={`${match.date.getFullYear()}-${String(match.date.getMonth() + 1).padStart(2, '0')}-${String(match.date.getDate()).padStart(2, '0')}T${String(match.date.getHours()).padStart(2, '0')}:${String(match.date.getMinutes()).padStart(2, '0')}`}
                                onChange={handleDateTimeChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salle">Salle</Label>
                            <Input
                                id="salle"
                                name="salle"
                                type="text"
                                value={match.salle}
                                onChange={(e) => setMatch(prev => ({ ...prev, salle: e.target.value }))}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="remise" checked={match.remise} onCheckedChange={() => setMatch(prev => ({ ...prev, remise: !prev.remise }))} />
                            <Label htmlFor="remise">Remis</Label>
                        </div>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-2">
                {isEditing ? (
                    <Button onClick={handleConfirm}>Confirmer</Button>
                ) : (
                    <>
                        <Badge className={match.joue ? "bg-green-500" : "bg-primary"}>
                            {match.joue ? "Joué" : "Non joué"}
                        </Badge>
                        {match.remise && <Badge variant="destructive">Remis</Badge>}
                        {match.forfaitEquipe1 && <Badge variant="match">Forfait {match.nomEquipe1}</Badge>}
                        {match.forfaitEquipe2 && <Badge variant="match" className="bg-red-500">Forfait {match.nomEquipe2}</Badge>}
                    </>
                )}
            </CardFooter>
        </Card>
    )
}

