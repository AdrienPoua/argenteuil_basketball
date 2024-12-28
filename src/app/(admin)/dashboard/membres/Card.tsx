"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Member from "@/models/Member";
import { CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { set } from "mongoose";
import Team from "@/models/Team";

type Dataprops = InstanceType<typeof Member>

export default function Index({ data, teams }: Readonly<{ data: Dataprops, teams: Team[] }>): React.ReactElement {
    const [isEditing, setIsEditing] = useState(false)
    if (isEditing) {
        return <EditingCard data={data} setIsEditing={setIsEditing} teams={teams} />
    } else {
        return <BaseCard data={data} setIsEditing={setIsEditing} />
    }
}

export function BaseCard({ data, setIsEditing }: Readonly<{ data: Dataprops, setIsEditing: (isEditing: boolean) => void }>) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {data.name}
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        Modifier
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                        <AvatarImage src={data.image} />
                        <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        {data.email && <p>{data.email}</p>}
                        {data.phone && <p>{data.phone}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {data.role.map((role) => (
                            <Badge key={role} variant="secondary">
                                {role}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.teams.map((team) => (
                            <Badge key={team.id}>{team.name}</Badge>
                        ))}
                    </div>
                    {data.isLeader && (
                        <Badge variant="destructive">Leader</Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}



const EditingCard = ({ data, setIsEditing, teams }: Readonly<{ data: Dataprops, setIsEditing: (isEditing: boolean) => void, teams: Team[] }>) => {
    return (
        <div>
            ...
        </div>
    )
}

