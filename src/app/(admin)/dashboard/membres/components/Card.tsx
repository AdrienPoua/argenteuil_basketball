"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Trash, X } from "lucide-react";
import { deleteMember } from "../actions/server.actions";
import Form from "./Form";
import { PropsType, CardPropsType } from "../types/card.types";

export default function Index({ data, teams }: Readonly<PropsType>): React.ReactElement {
    const [isEditing, setIsEditing] = useState(false)
    if (isEditing) {
        return <EditingCard data={data} setIsEditing={setIsEditing} teams={teams} />
    } else {
        return <BaseCard data={data} teams={teams} setIsEditing={setIsEditing} />
    }
}



export function BaseCard({ data, teams, setIsEditing }: Readonly<CardPropsType>) {
    return (
        <Card className="w-full text-background p-5 font-secondary">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="text-2xl flex gap-5">
                    <p> {data.name} </p>
                    {data.isLeader && (
                        <Badge variant="destructive">Leader</Badge>
                    )}
                </CardTitle>
                <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(true)} className="size-fit p-2">
                        <Pencil />
                    </Button>
                    <Button onClick={() => deleteMember(data.id)} variant="destructive" className="size-fit p-2">
                        <Trash />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex items-center mb-4">
                    <Avatar>
                        <AvatarImage src={data.image} />
                        <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p>{data.email && <span>{data.email}</span>}</p>
                        <p>{data.phone && <span>{data.phone}</span>}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {data.role.map((role) => (
                            <Badge key={role}>
                                {role}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.teams.map((team) => (
                            <Badge key={team.id}>{team.name}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


const EditingCard = ({ data, setIsEditing, teams }: Readonly<CardPropsType>) => {
    return (
        <div className="relative col-span-2">
            <Button onClick={() => setIsEditing(false)} variant="destructive" className="size-fit p-2 absolute top-0 right-0">
                <X />
            </Button>
            <Form defaultValues={data} teams={teams} setIsEditing={setIsEditing} />
        </div>
    )
}

