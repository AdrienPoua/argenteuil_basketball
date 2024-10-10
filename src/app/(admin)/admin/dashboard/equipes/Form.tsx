
'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrainingSession, TeamInputs } from './Components'
import { createTeam } from '@/lib/mongo/controllers/teams'
import { useToast } from '@/hooks/use-toast'
import Underline from '@/components/Underline'
import useReset from '@/hooks/use-reset'
import { TeamType } from './page'



export default function Form() {
    const { toast } = useToast()
    const reset = useReset()
    const [team, setTeam] = useState<TeamType>({
        id: '',
        name: '',
        image: '',
        coach: '',
        division: '',
        training: []
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (team.name) {
            createTeam(team)
            reset()
            toast({
                title: "success",
                description: "Votre demande a été envoyée avec succès !",
            })
        } else {
            toast({
                title: "Erreur",
                description: "Echec de votre demande",
            })
        }
    }
    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-6 shadow-custom">
            <Card className="shadow-xl">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className='text-background text-4xl relative'>Rajoutez une équipe <Underline /> </CardTitle>
                </CardHeader>
                <CardContent >
                    <TeamInputs setTeam={setTeam as () => void} team={team} />
                </CardContent>
            </Card>
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className='text-black relative w-fit'> <Underline /> Horaires d&apos;entrainements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {team.training.map((session, index) => (
                        <TrainingSession
                            key={index + session.day}
                            index={index}
                            setTeam={setTeam}
                            team={team}
                        />
                    ))}
                    <Button type="button" onClick={() => setTeam(prev => ({
                        ...prev,
                        training: [...prev.training, { day: '', start: '', end: '', gym: '' }]
                    }))} className='text-black'>
                        Ajouter un entrainement
                    </Button>
                </CardContent>
            </Card>
            <Button type="submit" className="w-full text-black">Créer</Button>
        </form>
    )
}
