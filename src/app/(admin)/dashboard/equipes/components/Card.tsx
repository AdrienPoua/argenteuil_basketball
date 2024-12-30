"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Trash2 } from 'lucide-react'
import Team from "@/models/Team"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { deleteTeam } from "../actions/server.actions"

interface PropsType {
    data: ReturnType<Team['toPlainObject']>
}

export default function TeamCard({ data }: Readonly<PropsType>) {
    return (
        <Card className="w-full max-w-md p-5 font-secondary">
            <CardHeader className="flex flex-col gap-2 mb-5 relative">
                <CardTitle className="text-xl uppercase w-full bg-primary text-center rounded-md">{data.name}</CardTitle>
                <div className="absolute top-0 right-0">
                    <Button variant="destructive" size="icon" onClick={() => deleteTeam(data.id)} >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-4">
                    {data.coach && (
                        <div className="flex items-center space-x-2 mb-2">
                            <Badge >
                                Entraineur
                            </Badge>
                        <p className="text-sm text-muted-foreground">
                                {data.coach.name}
                            </p>
                        </div>
                    )}
                    {data.sessions.map((session) => (
                        <div key={session.gymnase + session.day + session.start + session.end} className="flex items-center space-x-2 mb-2">
                            <Badge>{session.day}</Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-4 w-4" />
                                {session.start} - {session.end}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <CalendarDays className="inline mr-1 h-4 w-4" />
                                {session.gymnase.replace("_", " ")}
                            </div>
                        </div>
                    ))}
                    <div className="relative w-full h-48 mt-4">
                        <Image
                            src={data.image}
                            alt={data.name}
                            width={100}
                            height={100}
                            className="object-cover rounded-md w-full h-full"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
