'use client'

import { useState } from 'react'
import useFetchTeams from '@/utils/hooks/DBFetch/useFetchTeam'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Save } from 'lucide-react'
import FetchFeedBack from "@/components/FetchFeedback"
import { TDatabase } from '@/utils/types'
import Image from "next/image"
import { TeamInputs } from "./Components"
import { updateTeam } from '@/lib/mongo/controllers/teams'



export default function TeamManager() {
    const { data, isLoading, error } = useFetchTeams()
    return (
        <div className="space-y-8">
            <FetchFeedBack isLoading={isLoading} error={error} data={data}>
                <div>
                    <h3 className="text-3xl mx-auto text-background my-10 text-center shadow-custom">Liste des équipes</h3>
                    {data?.map(team => (
                        <TeamCard
                            key={team._id}
                            data={{ ...team, id: team._id }}
                        />
                    ))}
                </div>
            </FetchFeedBack>
        </div>
    )
}

const TeamCard = ({ data }: { data: TeamType }) => {
    const [team, setTeam] = useState<TeamType>(data)
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = async () => {
        try {
            console.log(team)
            await updateTeam(team.id, { ...team, image: `/images/teams/${team.image}` })
            setIsEditing(false)
        } catch (error) {
            console.error("Failed to update team:", error)
        }
    }

    return (
        <Card className="relative shadow-custom">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-black">
                    <h3>{team.name}</h3>
                    {isEditing ? (
                        <div>
                            <Button className="mr-2" onClick={handleSave}>
                                <Save className="mr-2 h-4 w-4 text-black" /> Save
                            </Button>
                            <Button variant="destructive" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>
                            <Edit2 className="mr-2 h-4 w-4 text-black" /> Edit
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <TeamInputs team={team} setTeam={setTeam} />
                ) : (
                    <NotEditingCard team={team} />
                )}
            </CardContent>
        </Card>
    )
}

export type TeamType = {
    id: string,
    name: string
    image?: string
    coach?: string
    division?: string
    training: {
        day: string
        start: string
        end: string
        gym: string
    }[]
}

const NotEditingCard = ({ team }: { team: TDatabase.Team }) => {
    return (
        <div className="space-y-2">
            <p className="text-black"><strong>Coach:</strong> {team.coach}</p>
            {team.image ? <Image src={team.image} alt="Equipe" width={200} height={200} /> : <p className="text-black"> pas d&apos;image </p>}
            <h3 className="text-lg font-semibold mt-4 text-black">Training Sessions</h3>
            <ul className="list-disc pl-5 text-black">
                {team.training.map((session, index) => (
                    <li key={`${session.day}-${index}`}>
                        {session.day} from {session.start} to {session.end} at {session.gym}
                    </li>
                ))}
            </ul>
        </div>
    )
}