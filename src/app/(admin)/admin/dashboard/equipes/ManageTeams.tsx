'use client'

import { useState } from 'react'
import useFetchTeams from '@/utils/hooks/DBFetch/useFetchTeam'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit2, Save } from 'lucide-react'
import FetchFeedBack from "@/components/FetchFeedback"
import { TDatabase } from '@/utils/types'
import { updateTeam } from '@/lib/mongo/controllers/teams'
import Image from "next/image"

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

interface TrainingSession {
    day: string
    start: string
    end: string
    gym: string
}

type TeamWithId = TDatabase.Team & { _id: string }

export default function TeamManager() {
    const { data, isLoading, error, refreshTeams } = useFetchTeams()
    const [editingTeam, setEditingTeam] = useState<TeamWithId | null>(null)

    return (
        <div className="space-y-8">
            <FetchFeedBack isLoading={isLoading} error={error} data={data}>
                <>
                    {data?.map(team => (
                        <FormCard
                            key={team._id}
                            team={team}
                            editingTeam={editingTeam}
                            setEditingTeam={setEditingTeam}
                            refresh={refreshTeams}
                        />
                    ))}
                </>
            </FetchFeedBack>
        </div>
    )
}

const FormCard = ({ team, editingTeam, setEditingTeam, refresh }: {
    team: TeamWithId,
    editingTeam: TeamWithId | null,
    setEditingTeam: React.Dispatch<React.SetStateAction<TeamWithId | null>>
    refresh: () => void
}) => {
    const handleSave = async () => {
        if (editingTeam) {
            try {
                await updateTeam(editingTeam._id, { ...editingTeam, image: `/images/teams/${editingTeam.image}` })
                setEditingTeam(null)
                refresh()
            } catch (error) {
                console.error("Failed to update team:", error)
            }
        }
    }

    return (
        <Card key={team._id} className="relative">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-black">
                    {editingTeam?._id === team._id ? editingTeam.name : team.name}
                    {editingTeam?._id === team._id ? (
                        <div>
                            <Button className="mr-2" onClick={handleSave}>
                                <Save className="mr-2 h-4 w-4 text-black" /> Save
                            </Button>
                            <Button variant="outline" onClick={() => setEditingTeam(null)} className='text-black'>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={() => setEditingTeam({ ...team })}>
                            <Edit2 className="mr-2 h-4 w-4 text-black" /> Edit
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {editingTeam?._id === team._id ? (
                    <EditingCard team={editingTeam} setEditingTeam={setEditingTeam} />
                ) : (
                    <DisplayCard team={team} />
                )}
            </CardContent>
        </Card>
    )
}

const EditingCard = ({ team, setEditingTeam }: {
    team: TeamWithId,
    setEditingTeam: React.Dispatch<React.SetStateAction<TeamWithId | null>>
}) => {
    const addTrainingSession = () => {
        setEditingTeam(prev => ({
            ...prev!,
            training: [...prev!.training, { day: '', start: '', end: '', gym: '' }]
        }))
    }

    const removeTrainingSession = (index: number) => {
        setEditingTeam(prev => ({
            ...prev!,
            training: prev!.training.filter((_, i) => i !== index)
        }))
    }

    const handleTrainingChange = (index: number, field: keyof TrainingSession, value: string) => {
        setEditingTeam(prev => {
            const newTraining = [...prev!.training]
            newTraining[index] = { ...newTraining[index], [field]: value }
            return { ...prev!, training: newTraining }
        })
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-black">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={team.name}
                    onChange={(e) => setEditingTeam((prev) => ({ ...prev!, name: e.target.value }))}
                    required
                    className="text-black"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image" className="text-black">Image URL</Label>
                <Input
                    id="image"
                    name="image"
                    value={team.image}
                    onChange={(e) => setEditingTeam((prev) => ({ ...prev!, image: e.target.value }))}
                    required
                    className="text-black"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="coach" className="text-black">Coach</Label>
                <Input
                    id="coach"
                    name="coach"
                    value={team.coach}
                    onChange={(e) => setEditingTeam((prev) => ({ ...prev!, coach: e.target.value }))}
                    required
                    className="text-black"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="division" className="text-black">Division</Label>
                <Input
                    id="division"
                    name="division"
                    value={team.division}
                    onChange={(e) => setEditingTeam((prev) => ({ ...prev!, division: e.target.value }))}
                    required
                    className="text-black"
                />
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Training Sessions</h3>
                {team.training.map((session, index) => (
                    <div key={`${session.day}-${index}`} className="flex flex-wrap items-end gap-2 pb-4 border-b">
                        <div className="flex-1 min-w-[200px]">
                            <Label htmlFor={`day-${index}`} className="text-black">Day</Label>
                            <Select
                                onValueChange={(value) => handleTrainingChange(index, 'day', value)}
                                value={session.day}
                            >
                                <SelectTrigger id={`day-${index}`}>
                                    <SelectValue placeholder="Select a day" className="text-black" />
                                </SelectTrigger>
                                <SelectContent className="text-black">
                                    {days.map((day) => (
                                        <SelectItem key={day} value={day} className="text-black">{day}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <Label htmlFor={`start-${index}`} className="text-black">Start Time</Label>
                            <Input
                                id={`start-${index}`}
                                type="time"
                                value={session.start}
                                onChange={(e) => handleTrainingChange(index, 'start', e.target.value)}
                                required
                                className="text-black"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <Label htmlFor={`end-${index}`} className="text-black">End Time</Label>
                            <Input
                                id={`end-${index}`}
                                type="time"
                                value={session.end}
                                onChange={(e) => handleTrainingChange(index, 'end', e.target.value)}
                                required
                                className="text-black"
                            />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <Label htmlFor={`gym-${index}`} className="text-black">Gym</Label>
                            <Select
                                onValueChange={(value) => handleTrainingChange(index, 'gym', value)}
                                value={session.gym}
                            >
                                <SelectTrigger id={`gym-${index}`}>
                                    <SelectValue placeholder="Select a gym" className="text-black" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Jean Guimier" className="text-black">Jean Guimier</SelectItem>
                                    <SelectItem value="Jesse Owens" className="text-black">Jesse Owens</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeTrainingSession(index)}
                        >
                            <Trash2 className="h-4 w-4 text-black" />
                        </Button>
                    </div>
                ))}
                <Button type="button" onClick={addTrainingSession} className="text-black">
                    Add Training Session
                </Button>
            </div>
        </div>
    )
}

const DisplayCard = ({ team }: { team: TDatabase.Team }) => {
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