import type { Metadata } from "next"
import H1 from "@/components/ui/H1"
import { GymnaseEntity } from "@/core/domain/entities/gymnase.entity"
import { TeamEntity } from "@/core/domain/entities/team.entity"
import { readGymnases } from "@/core//presentation/actions/gymnases/read"
import { readTeams } from "@/core//presentation/actions/teams/getAllTeams"
import club from "@/core/shared/config/club"
import Component from "./page.client"

export const metadata: Metadata = {
  title: "Planning des entraînements",
  description:
    "Consultez les horaires d'entraînement du BC Sartrouville : créneaux par équipe, gymnases, jours et heures. Planning complet pour toutes les catégories d'âge.",
  keywords: [
    "planning entraînements BC Sartrouville",
    "horaires entraînement basket",
    "créneaux basket",
    "gymnase entraînement",
    "séances basket",
    "planning équipes",
    "horaires club basket",
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
        alt: "Planning entraînements BC Sartrouville",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Planning des entraînements - ${club.name}`,
    description:
      "Consultez les horaires d'entraînement du BC Sartrouville : créneaux par équipe, gymnases, jours et heures.",
    images: [`https://${club.domain}${club.logo}`],
  },
  alternates: {
    canonical: `https://${club.domain}/plannings/entrainements`,
  },
}

export type SessionWithTeamInfo = {
  id: string
  day: string
  start: string
  end: string
  gymnase_id: string
  created_at: string
  team: string
  category: string[]
  level: string
  gender: string
  coach: string
}

export type TeamType = ReturnType<TeamEntity["toObject"]>
export type GymnaseType = ReturnType<GymnaseEntity["toObject"]>
export type daysType = string[]
export type timeSlotsType = string[]
export type sessionsByDayType = Record<string, SessionWithTeamInfo[]>
export type sessionsByDayAndTimeType = Record<string, Record<string, SessionWithTeamInfo[]>>
export type allSessionsType = SessionWithTeamInfo[]
export type gymnaseMapType = Record<string, string>

export default async function page() {
  const teams: TeamType[] = await readTeams().then((teams) => teams.map((team) => team.toObject()))
  const gymnases: GymnaseType[] = await readGymnases().then((gymnases) => gymnases.map((gymnase) => gymnase.toObject()))
  const days: daysType = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  const timeSlots: timeSlotsType = Array.from({ length: 14 }, (_, i) => {
    const hour = 9 + i
    return `${hour.toString().padStart(2, "0")}:00`
  })

  const sessionsByDay: sessionsByDayType = days.reduce(
    (acc, day) => {
      acc[day] = teams
        .flatMap((team) =>
          (team.sessions ?? [])
            .filter((session) => session.day === day)
            .map((session) => ({
              ...session,
              team: team.name,
              category: team.category,
              level: team.level,
              gender: team.gender,
              coach: team.coachs?.[0]?.first_name ?? "",
            }))
        )
        .sort((a, b) => a.start.localeCompare(b.start))
      return acc
    },
    {} as Record<string, SessionWithTeamInfo[]>
  )

  const sessionsByDayAndTime: sessionsByDayAndTimeType = days.reduce(
    (acc, day) => {
      acc[day] = {}

      for (const time of timeSlots) {
        const sessionsAtTime: SessionWithTeamInfo[] = []

        for (const team of teams) {
          const teamSessions = team.sessions ?? []

          for (const session of teamSessions) {
            const isMatchingTime = session.day === day && session.start <= time && session.end > time

            if (isMatchingTime) {
              sessionsAtTime.push({
                ...session,
                team: team.name,
                category: team.category,
                level: team.level,
                gender: team.gender,
                coach: team.coachs?.[0]?.first_name ?? "",
              })
            }
          }
        }

        acc[day]![time] = sessionsAtTime
      }

      return acc
    },
    {} as Record<string, Record<string, SessionWithTeamInfo[]>>
  )

  const allSessions: allSessionsType = teams
    .flatMap((team) =>
      team.sessions.map((session) => ({
        ...session,
        team: team.name,
        category: team.category,
        level: team.level,
        gender: team.gender,
        coach: team.coachs?.[0]?.first_name ?? "",
      }))
    )
    .sort((a, b) => {
      const dayOrder = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
      const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
      if (dayDiff !== 0) return dayDiff
      return a.start.localeCompare(b.start)
    })

  const gymnaseMap: gymnaseMapType = gymnases.reduce(
    (acc, gymnase) => {
      acc[gymnase.id] = gymnase.name
      return acc
    },
    {} as Record<string, string>
  )

  return (
    <div>
      <H1>Plannings</H1>
      <Component
        teams={teams}
        days={days}
        gymnases={gymnases}
        sessionsByDay={sessionsByDay}
        sessionsByDayAndTime={sessionsByDayAndTime}
        allSessions={allSessions}
        gymnaseMap={gymnaseMap}
        timeSlots={timeSlots}
      />
    </div>
  )
}
