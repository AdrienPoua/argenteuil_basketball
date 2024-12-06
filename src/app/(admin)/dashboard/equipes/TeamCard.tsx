'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Trash2 } from 'lucide-react'
import Image from "next/image"
import Form from './Form'
import { FormValues } from "./Utils"
import { useQueryClient } from "react-query"
import { DeleteTeam } from "@/database/controllers/teams"


export const TeamCard = ({ data }: { data: Omit<FormValues, 'image'> & { id: string, image?: string } }) => {
    const [isEditing, setIsEditing] = useState(false)
    if (isEditing) return <EditCard data={data} setIsEditing={setIsEditing} />
    return (
        <Card className="relative shadow-custom">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-black">
                    <h3>{data.name}</h3>
                    <Button onClick={() => setIsEditing(true)}>
                        <Edit2 className="mr-2 h-4 w-4" /> Modifier
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-black"><strong>Coach:</strong> {data.coach}</p>
                    {data.image ? <Image src={data.image} alt="Equipe" width={200} height={200} className="size-auto" /> : <p className="text-black"> pas d&apos;image </p>}
                    <h3 className="text-lg font-semibold mt-4 text-black">Training Sessions</h3>
                    <ul className="list-disc pl-5 text-black">
                        {data.training.map((session, index) => (
                            <li key={`${session.day}-${index}`}>
                                {session.day} from {session.start} to {session.end} at {session.gym}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

const EditCard = ({ data, setIsEditing }: { data: Omit<FormValues, 'image'> & { id: string, image?: string }, setIsEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient()
    const HandleTrash = () => {
        DeleteTeam(data.id)
        queryClient.invalidateQueries(["teams"])
        setIsEditing(false)
    }
    return (
        <div className="relative size-fit mx-auto">
            <Form defaultValues={data} setIsEditing={setIsEditing} />
            <div className="flex justify-end absolute top-0 right-0">
                <Button onClick={() => HandleTrash()} type="button" variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4 text-black" />
                </Button>
                <Button onClick={() => setIsEditing(false)} type="button" size="icon">
                    <Edit2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}