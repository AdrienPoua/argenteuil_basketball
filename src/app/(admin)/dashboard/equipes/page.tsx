'use client'
import useFetchTeams from '@/hooks/useFetchTeam'
import FetchFeedBack from '@/components/FetchFeedback'
import { TeamCard } from './TeamCard'
import Form from './Form'


export default function Index() {
  const { data, isLoading, error } = useFetchTeams()

  return (
    <div className="flex flex-col gap-4">
      <Form />
      <div className="space-y-8">
        <FetchFeedBack isLoading={isLoading} error={error} data={data}>
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl mx-auto text-background my-10 text-center shadow-custom bg-foreground p-5">Liste des équipes</h3>
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




