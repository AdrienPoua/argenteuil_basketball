"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Pencil, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { deleteTeam } from "../actions/server.actions"
import { BaseCardPropsType, EditingCardPropsType, PropsType } from "../types/card.types"
import { useState } from "react"
import Form from "./Form"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function Index({ data, members }: Readonly<PropsType>) {
    const [isEditing, setIsEditing] = useState(false)
    if (isEditing) {
        return <EditCard data={data} members={members} setIsEditing={setIsEditing}/>
    }
    return <TeamCard data={data} setIsEditing={setIsEditing} />
}

export function TeamCard({ data, setIsEditing }: Readonly<BaseCardPropsType>) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = async () => {
        await deleteTeam(data.id);
        setIsDialogOpen(false);
    };

    return (
        <Card className="w-full max-w-md p-5 font-secondary hover:shadow-lg transition-shadow text-muted-foreground">
            <CardHeader className="flex flex-col gap-2 mb-5 relative">
                <CardTitle className="text-xl uppercase w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-center shadow-sm">
                    {data.name}
                </CardTitle>
                <div className="absolute top-0 right-0 flex gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="size-fit p-2 absolute top-0 right-0">
                                <X />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirmation</DialogTitle>
                                <DialogDescription>
                                    Tu es sur le point de supprimer l&apos;équipe {data.name}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Confirmer
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        aria-label={`Modifier l'équipe ${data.name}`}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        aria-label={`Modifier l'équipe ${data.name}`}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-6">
                    {data.coach && (
                        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                            <Badge className="whitespace-nowrap">
                                Entraineur
                            </Badge>
                            <p className="text-sm font-medium">
                                {data.coach.name}
                            </p>
                        </div>
                    )}
                    {data.championnats.length > 0 && (
                        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                            <Badge className="whitespace-nowrap">
                                Championnats
                            </Badge>
                            <p className="text-sm font-medium">
                                {data.championnats.join(", ")}
                            </p>
                        </div>
                    )}
                    <div className="space-y-2">
                        {data.sessions.map((session) => (
                            <div
                                key={session.gymnase + session.day + session.start + session.end}
                                className="flex flex-wrap items-center gap-2 p-2 bg-muted/30 rounded-md"
                            >
                                <Badge className="whitespace-nowrap">
                                    {session.day}
                                </Badge>
                                <div className="flex items-center text-sm">
                                    <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
                                    <span>{session.start} - {session.end}</span>
                                </div>
                                <div className="text-sm flex items-center">
                                    <CalendarDays className="mr-1.5 h-4 w-4 text-muted-foreground" />
                                    <span>{session.gymnase.replace("_", " ")}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative w-full aspect-video mt-4 rounded-md overflow-hidden shadow-md">
                        <Image
                            src={data.image}
                            alt={`Photo de l'équipe ${data.name}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const EditCard = ({ data, members, setIsEditing }: Readonly<EditingCardPropsType>) => {
    return (
        <div className="relative col-span-2">
            <Button onClick={() => setIsEditing(false)} variant="destructive" className="size-fit p-2 absolute top-0 right-0">
                <X />
            </Button>
            <Form defaultValues={data} members={members} setIsEditing={setIsEditing} />
        </div>
    )
}
