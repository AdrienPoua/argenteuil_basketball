import type { Metadata } from 'next'
import H1 from '@/components/ui/H1'
import { readTeams } from '@/core/presentation/actions/teams/getAllTeams'
import club from '@/core/shared/config/club'
import { readGymnases } from '@/core/presentation/actions/gymnases/read'
import { TeamCard } from './page.card'

export const metadata: Metadata = {
  title: 'Nos équipes',
  description:
    'Découvrez toutes les équipes de Argenteuil Basketball : équipe senior en PRM, équipes jeunes, école de basket. Du mini-basket aux seniors, nous avons une équipe pour chaque âge !',
  keywords: [
    'équipes BC Sartrouville',
    'équipe senior basketball',
    'PNM basket',
    'équipes jeunes basket',
    'U13 U15 U18 U21',
    'académie basket',
    'école de basket',
    'mini basket',
    'baby basket',
    'équipe féminine basket',
  ],
  openGraph: {
    title: `Nos équipes - ${club.name}`,
    description:
      "Découvrez toutes les équipes du club de basket d'Argenteuil : équipe senior en PRM, équipes jeunes, académie et école de basket.",
    url: `https://${club.domain}/club/equipes`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Nos équipes - ${club.name}`,
    description:
      "Découvrez toutes les équipes du club de basket d'Argenteuil : équipe senior en PRM, équipes jeunes, académie et école de basket.",
  },
  alternates: {
    canonical: `https://${club.domain}/club/equipes`,
  },
}

export default async function Index() {
  const teams = await readTeams()
    .then((teams) => teams.map((team) => team.toObject()))
    .then((teams) => teams.sort((a, b) => (a.image ? -1 : 1)))

  console.log('🚀 ~ Index ~ teams:', teams)

  const gymnases = await readGymnases()
    .then((gymnases) => gymnases.map((gymnase) => gymnase.toObject()))
    .then((gymnases) => gymnases.sort((a, b) => a.name.localeCompare(b.name)))
  return (
    <main>
      <H1>Nos équipes</H1>
      <div className="container relative min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Section équipes */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {teams.map((team) => (
            <div key={team.id}>
              <TeamCard team={team} gymnases={gymnases} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
