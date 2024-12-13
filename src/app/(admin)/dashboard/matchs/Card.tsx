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
            <CardHeader className="flex flex-row items-center justify-between mb-3">
                <CardTitle className="text-lg w-full text-center mb">
                    Journée {match.numeroJournee} - Match n°{match.numero}
                </CardTitle>
                {!isEditing && (
                    <div className="flex gap-2">
                        <Button onClick={() => setIsEditing(true)}>
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
                            <Select onValueChange={(value) => setMatch(prev => ({ ...prev, salle: value }))} defaultValue={match.salle}>
                                <SelectTrigger>
                                    <SelectValue placeholder={match.salle} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Gymnase J. GUIMIER">Gymnase J. GUIMIER</SelectItem>
                                    <SelectItem value="Gymnase Jesse OWENS">Gymnase Jesse OWENS</SelectItem>
                                </SelectContent>
                            </Select>
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
                        {match.forfaitEquipe1 && <Badge variant="destructive">Forfait {match.nomEquipe1}</Badge>}
                        {match.forfaitEquipe2 && <Badge variant="destructive">Forfait {match.nomEquipe2}</Badge>}
                    </>
                )}
            </CardFooter>
        </Card>
    )
}

