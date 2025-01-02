"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { deleteClub } from "../actions/server.actions"
import { CardPropsType, PropsType } from "../types/card.types"
import { useState } from "react"
import Form from "./Form"

export default function Index({ data }: Readonly<PropsType>) {
    const [isEditing, setIsEditing] = useState(false)
    if (isEditing) {
        return <EditCard data={data} setIsEditing={setIsEditing} />
    }
    return <ClubCard data={data} setIsEditing={setIsEditing} />
}

export function ClubCard({ data, setIsEditing }: Readonly<CardPropsType>) {
    return (
        <Card className="w-full max-w-md p-5 font-secondary hover:shadow-lg transition-shadow text-muted-foreground">
            <CardHeader className="flex flex-col gap-2 mb-5 relative">
                <CardTitle className="text-xl uppercase w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-center shadow-sm">
                    {data.name}
                </CardTitle>
                <div className="absolute top-0 right-0 flex gap-2">
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteClub(data.id)}
                        aria-label={`Supprimer le club ${data.name}`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        aria-label={`Modifier le club ${data.name}`}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                        <Badge className="whitespace-nowrap">
                            Email
                        </Badge>
                        <p className="text-sm font-medium">
                            {data.email}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                        <Badge className="whitespace-nowrap">
                            Téléphone
                        </Badge>
                        <p className="text-sm font-medium">
                            {data.phone}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const EditCard = ({ data, setIsEditing }: Readonly<CardPropsType>) => {
    return (
        <div className="relative col-span-2">
            <Button onClick={() => setIsEditing(false)} variant="destructive" className="size-fit p-2 absolute top-0 right-0">
                <X />
            </Button>
            <Form defaultValues={data} setIsEditing={setIsEditing} />
        </div>
    )
}
