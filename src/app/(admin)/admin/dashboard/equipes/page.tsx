'use client'
import useFetchTeams from '@/utils/hooks/DBFetch/useFetchTeam'
import FetchFeedBack from '@/components/FetchFeedback'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrainingSession, TeamInputs, TeamCard } from './Components'
import { createTeam } from '@/lib/mongo/controllers/teams'
import { useToast } from '@/hooks/use-toast'
import Underline from '@/components/UnderlineDecorator'
import useReset from '@/hooks/use-reset'

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

export default function TeamForm() {
  const { data, isLoading, error } = useFetchTeams()

  return (
    <div className="flex flex-col gap-4">
      <Form />
      <div className="space-y-8">
        <FetchFeedBack isLoading={isLoading} error={error} data={data}>
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl mx-auto text-background my-10 text-center shadow-custom">Liste des équipes</h3>
            {data?.map((team) => (
              <TeamCard
                key={team._id}
                data={{ ...team, id: team._id }}
              />
            ))}
          </div>
        </FetchFeedBack>
      </div>
    </div>
  )
}




function Form() {
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
    <form onSubmit={handleSubmit} className=" flex flex-col gap-5 w-fit mx-auto">
      <div className="flex gap-5 mx-auto">
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
          <CardContent className="flex flex-col gap-5">
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
            }))} >
              Ajouter un entrainement
            </Button>
          </CardContent>
        </Card>
      </div>
      <Button type="submit" >Créer</Button>
    </form>
  )
}
