import type { Metadata } from 'next'
import H1 from '@/components/ui/H1'
import { TeamEntity } from '@/core/domain/entities/team.entity'
import { readTeams } from '@/core//presentation/actions/teams/getAllTeams'
import club from '@/core/shared/config/club'
import Tabs from './page.tabs'

export const metadata: Metadata = {
  title: 'Planning des entraînements',
  description:
    "Consultez les horaires d'entraînement du BC Sartrouville : créneaux par équipe, gymnases, jours et heures. Planning complet pour toutes les catégories d'âge.",
  keywords: [
    'planning entraînements BC Sartrouville',
    'horaires entraînement basket',
    'créneaux basket',
    'gymnase entraînement',
    'séances basket',
    'planning équipes',
    'horaires club basket',
  ],
  openGraph: {
    title: `Planning des entraînements - ${club.name}`,
    description:
      "Consultez les horaires d'entraînement du BC Sartrouville : créneaux par équipe, gymnases, jours et heures.",
    url: `https://${club.domain}/plannings/entrainements`,
    images: [
      {
        url: `https://${club.domain}${club.logo}`,
        width: 1200,
        height: 630,
        alt: 'Planning entraînements BC Sartrouville',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Planning des entraînements - ${club.name}`,
    description:
      "Consultez les horaires d'entraînement du BC Sartrouville : créneaux par équipe, gymnases, jours et heures.",
    images: [`https://${club.domain}${club.logo}`],
  },
  alternates: {
    canonical: `https://${club.domain}/plannings/entrainements`,
  },
}

export type TeamType = ReturnType<TeamEntity['toObject']>

export default async function page() {
  const teams: TeamType[] = await readTeams().then((teams) => teams.map((team) => team.toObject()))
  return (
    <div>
      <H1>Plannings</H1>
      <div className="container mx-auto px-5">
        <Tabs teams={teams} />
      </div>
    </div>
  )
}
