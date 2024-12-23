"use client"

import CompetitionResultsTabs from './table'
import { useQuery } from 'react-query'
import { getCompetitions } from "@/database/services/Competitions";
import H1 from "@/components/H1"
import MainSection from "@/components/layouts/MainSection";

export default function Page() {
  const { data: competitions, isLoading, error } = useQuery('competitions', () => {
    return getCompetitions()
  })
  if (!competitions) return <div>Loading...</div>

  return (
    <>
      <H1>Classements interpoules</H1>
      <MainSection>
        <CompetitionResultsTabs competitions={competitions} />
      </MainSection>
    </>
  )
}

