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
    forfaitEquipe1: boolean
    forfaitEquipe2: boolean
}

export default function MatchCard({ match: initialMatch }: Readonly<{ match: MatchData }>) {
    const [isEditing, setIsEditing] = useState(false)
    const [match, setMatch] = useState<MatchData>(initialMatch)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const dateObj = new Date(match.date)
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const horaireStr = String(match.horaire).padStart(4, '0')
    const hours = parseInt(horaireStr.slice(0, 2), 10)
    const minutes = parseInt(horaireStr.slice(-2), 10)
    dateObj.setHours(hours, minutes, 0, 0)
    const formattedTime = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}`

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setMatch(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name: string) => {
        setMatch(prev => ({ ...prev, [name]: !prev[name as keyof MatchData] }))
    }

    const handleSalleChange = (value: string) => {
        setMatch(prev => ({ ...prev, salle: { ...prev.salle, libelle: value } }))
    }

    const handleConfirm = () => {
        console.log("Modifications confirmées:", match)
        setIsEditing(false)
    }

    const handleDelete = () => {
        console.log("supprimer")
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
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" type="date" value={match.date} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="horaire">Horaire</Label>
                            <Input id="horaire" name="horaire" type="time" value={formattedTime} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salle">Salle</Label>
                            <Select onValueChange={handleSalleChange} defaultValue={match.salle.libelle}>
                                <SelectTrigger>
                                    <SelectValue defaultValue={match.salle.libelle} placeholder={match.salle.libelle} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Gymnase J. GUIMIER">Gymnase J. GUIMIER</SelectItem>
                                    <SelectItem value="Gymnase Jesse OWENS">Gymnase Jesse OWENS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="joue" checked={match.joue} onCheckedChange={() => handleSwitchChange('joue')} />
                            <Label htmlFor="joue">Joué</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="remise" checked={match.remise} onCheckedChange={() => handleSwitchChange('remise')} />
                            <Label htmlFor="remise">Remis</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="forfaitEquipe1" checked={match.forfaitEquipe1} onCheckedChange={() => handleSwitchChange('forfaitEquipe1')} />
                            <Label htmlFor="forfaitEquipe1">Forfait Équipe 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="forfaitEquipe2" checked={match.forfaitEquipe2} onCheckedChange={() => handleSwitchChange('forfaitEquipe2')} />
                            <Label htmlFor="forfaitEquipe2">Forfait Équipe 2</Label>
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
                            <span>{match.salle?.libelle || 'Salle non définie'}</span>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className="flex flex-wrap justify-between gap-2">
                {isEditing ? (
                    <Button onClick={handleConfirm}>Confirmer</Button>
                ) : (
                    <>
                        <Badge variant={match.joue ? "default" : "secondary"}>
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

