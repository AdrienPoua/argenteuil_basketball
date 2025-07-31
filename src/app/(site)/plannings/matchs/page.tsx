import type { Metadata } from "next"
import { toPersistence } from "@/core/infrastructure/supabase/mappers/match.mapper"
import { readMatchs } from "@/core//presentation/actions/matchs/read"
import club from "@/core/shared/config/club"
import ClientSide from "./page.client"

export const metadata: Metadata = {
  title: "Planning des matchs",
  description:
    "Consultez le calendrier des matchs du BC Sartrouville : dates, horaires, adversaires et résultats. Suivez toutes les rencontres de nos équipes en temps réel.",
  keywords: [
    "planning matchs BC Sartrouville",
    "calendrier basket",
    "matchs basketball",
    "résultats basket",
    "rencontres sportives",
    "fixture basket",
    "score match",
    "championnat basket",
  ],
  openGraph: {
    title: `Planning des matchs - ${club.name}`,
    description: "Consultez le calendrier des matchs du BC Sartrouville : dates, horaires, adversaires et résultats.",
    url: `https://${club.domain}/plannings/matchs`,
    images: [
      {
        url: `https://${club.domain}${club.logo}`,
        width: 1200,
        height: 630,
        alt: "Planning matchs BC Sartrouville",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Planning des matchs - ${club.name}`,
    description: "Consultez le calendrier des matchs du BC Sartrouville : dates, horaires, adversaires et résultats.",
    images: [`https://${club.domain}${club.logo}`],
  },
  alternates: {
    canonical: `https://${club.domain}/plannings/matchs`,
  },
}

export default async function MatchsPage() {
  const matchs = await readMatchs().then((matchs) => {
    return matchs.map((match) => toPersistence(match))
  })
  return <ClientSide matchs={matchs} />
}
