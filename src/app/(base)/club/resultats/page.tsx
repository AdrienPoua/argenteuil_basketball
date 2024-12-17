"use client"

import CompetitionResultsTabs from './table'
import { useQuery } from 'react-query'
import getCompetitions from '@/services/api/getCompetitionsDetails' // Assume this function fetches the competitions from your API

export default function RankingPage() {
  const { data: competitions, isLoading, error } = useQuery('competitions', () => getCompetitions())

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Classements des compétitions</h1>
      <CompetitionResultsTabs competitions={competitions} />
    </div>
  )
}

