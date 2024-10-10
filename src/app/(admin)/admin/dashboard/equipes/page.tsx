'use client'
import Teams from './ManageTeams'
import Form from './Form'

export type TeamType = {
  id: string,
  name: string
  image: string
  coach: string
  division: string
  training: {
    day: string
    start: string
    end: string
    gym: string
  }[]
}

export default function TeamForm() {

  return (
    <div className="flex flex-col gap-4">
      <Form />
      <Teams />
    </div>
  )
}




