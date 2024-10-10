'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from 'lucide-react'
import { TeamType } from "./page"
import { Dispatch, SetStateAction } from "react"
import Underline from "@/components/Underline"

type TrainingSession = {
    day: string;
    start: string;
    end: string;
    gym: string;
}

type TrainingSessionProps = { index: number, setTeam: Dispatch<SetStateAction<TeamType>>, team: TeamType }
const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

export function TrainingSession({ index, setTeam, team }: Readonly<TrainingSessionProps>) {

    const handleTrainingChange = (index: number, field: keyof TrainingSession, value: string) => {
        setTeam(prev => {
            const newTraining = [...prev.training]
            newTraining[index] = { ...newTraining[index], [field]: value }
            return { ...prev, training: newTraining }
        })
    }


    return <div key={index} className="flex flex-wrap items-end gap-2 pb-4 border-b text-black">
        <div className="flex-1 min-w-[200px]">
            <Label className="text-black" htmlFor={`day-${index}`}>Jour</Label>
            <Select
                onValueChange={(value) => handleTrainingChange(index, 'day', value)}
                value={team.training[index].day}
            >
                <SelectTrigger id={`day-${index}`} className="text-black">
                    <SelectValue className="text-black" placeholder="Selectionne un jour" />
                </SelectTrigger>
                <SelectContent className="text-black">
                    {days.map((day) => (
                        <SelectItem key={day} className="text-black" value={day}>{day}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="flex-1 min-w-[150px]">
            <Label className='text-black' htmlFor={`start-${index}`}>Début</Label>
            <Input
                id={`start-${index}`}
                type="time"
                value={team.training[index].start}
                onChange={(e) => handleTrainingChange(index, 'start', e.target.value)}
                required
                className='text-black' />
        </div>
        <div className="flex-1 min-w-[150px]">
            <Label className='text-black' htmlFor={`end-${index}`}>Fin</Label>
            <Input
                id={`end-${index}`}
                type="time"
                value={team.training[index].end}
                onChange={(e) => handleTrainingChange(index, 'end', e.target.value)}
                required
                className='text-black' />
        </div>
        <div className="flex-1 min-w-[200px]">
            <Label className='text-black' htmlFor={`gym-${index}`}>Gymnase</Label>
            <Select
                onValueChange={(value) => handleTrainingChange(index, 'gym', value)}
                value={team.training[index].gym}
            >
                <SelectTrigger id={`gym-${index}`}>
                    <SelectValue className='text-black' placeholder="Select a gym" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className='text-black' value="Jean Guimier">Jean Guimier</SelectItem>
                    <SelectItem className='text-black' value="Jesse Owens">Jesse Owens</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => setTeam(prev => ({
                ...prev,
                training: prev.training.filter((_, i) => i !== index)
            }))}
        >
            <Trash2 className="h-4 w-4 text-black" />
        </Button>
    </div>
}

type Team = {
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

type TeamInputsProps = {
    team: Team,
    setTeam: Dispatch<SetStateAction<Team>>
}
export const TeamInputs = ({ setTeam, team }: TeamInputsProps) => {
    return (
        <>
            <div className="space-y-5">
                <Label htmlFor="name" className='text-black relative'>Nom de l&apos;équipe <Underline /></Label>
                <Input
                    id="name"
                    name="name"
                    value={team.name}
                    onChange={(e) => setTeam(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className='text-black' />
            </div>
            <div className="space-y-5">
                <Label htmlFor="image" className='text-black relative'> <Underline /> Nom de l&apos;image</Label>
                <Input
                    id="image"
                    name="image"
                    value={team.image}
                    onChange={(e) => setTeam(prev => ({ ...prev, image: e.target.value }))}
                    className='text-black' />
            </div>
            <div className="space-y-5">
                <Label htmlFor="coach" className='text-black relative'> <Underline /> Entraineur de l&apos;équipe</Label>
                <Input
                    id="coach"
                    name="coach"
                    value={team.coach}
                    onChange={(e) => setTeam(prev => ({ ...prev, coach: e.target.value }))}
                    className='text-black' />
            </div>
            <div className="space-y-5">
                <Label htmlFor="division" className='text-black relative'> <Underline /> L&apos;équipe évolue en division</Label>
                <Input
                    id="division"
                    name="division"
                    value={team.division}
                    onChange={(e) => setTeam(prev => ({ ...prev, division: e.target.value }))}
                    className='text-black' />
            </div>
        </>
    );
};