"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, X, Mail, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { deleteClub } from "../actions/server.actions"
import { CardPropsType, PropsType } from "../types/card.types"
import { useState } from "react"
import Form from "./Form"
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

export default function Index({ data }: Readonly<PropsType>) {
    const [isEditing, setIsEditing] = useState(false)
    if (isEditing) {
        return <EditCard data={data} setIsEditing={setIsEditing} />
    }
    return <ClubCard data={data} setIsEditing={setIsEditing} />
}

export function ClubCard({ data, setIsEditing }: Readonly<CardPropsType>) {
    const handleDelete = async () => {
        await deleteClub(data.id);
    };

    return (
        <Card className="w-full max-w-md font-secondary hover:shadow-lg transition-all duration-300 text-muted-foreground">
            <CardHeader className="relative p-6">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold text-background">
                        {data.libelle}
                    </CardTitle>
                    <div className="flex gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    aria-label={`Supprimer le club ${data.libelle}`}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce club ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action ne peut pas être annulée. Cela supprimera définitivement le club {data.libelle} et toutes les données associées.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Confirmer la suppression</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button
                            size="icon"
                            onClick={() => setIsEditing(true)}
                            aria-label={`Modifier le club ${data.libelle}`}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-md">
                    <Badge>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                    </Badge>
                    <p className="text-sm font-medium">
                        {data.email}
                    </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-md">
                    <Badge variant="secondary">
                        <Phone className="h-4 w-4 mr-2" />
                        Téléphone
                    </Badge>
                    <p className="text-sm font-medium">
                        {data.phone}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

const EditCard = ({ data, setIsEditing }: Readonly<CardPropsType>) => {
    return (
        <div className="relative col-span-2">
            <Button onClick={() => setIsEditing(false)} variant="destructive" className="size-fit p-2 absolute top-0 right-0 z-10">
                <X />
            </Button>
            <Form defaultValues={data} setIsEditing={setIsEditing} />
        </div>
    )
}

