"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import H2 from "@/components/ui/h2"
import type { TeamEntity } from "@/core/domain/entities/team.entity"
import { Category, Level } from "@/core/domain/entities/team.entity"
import club from "@/core/shared/config/club"
import { cn } from "@/core/shared/utils/cn"

type PageProps = Readonly<{
  teams: ReturnType<TeamEntity["toObject"]>[]
}>

const EquipeJeunesList = [Category.U13, Category.U15, Category.U18, Category.U21]

export default function TeamsPage({ teams }: PageProps) {
  const equipesSeniors = teams.filter(
    (team) =>
      team.category.includes(Category.Seniors) ||
      team.category.includes(Category.Loisir)
  )
  const equipesJeunes = teams
    .filter((team) => EquipeJeunesList.some((category) => team.category.includes(category)))
    .filter((team) => team.level !== Level.Académie && team.level !== Level.Ecole)
  const equipesAcademie = teams.filter((team) => team.level === Level.Académie)
  const equipesMini = teams.filter((team) => team.level === Level.Ecole)

  return (
    <div className="relative container min-h-screen px-4 sm:px-6 lg:px-8">
      {equipesSeniors.length > 0 && (
        <section className="mb-12 space-y-6 sm:mb-16 sm:space-y-8 lg:mb-20">
          <H2 className="text-center sm:text-left">Nos Équipes seniors</H2>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {equipesSeniors.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      )}
      {equipesJeunes.length > 0 && (
        <section className="mb-12 space-y-6 sm:mb-16 sm:space-y-8 lg:mb-20">
          <H2 className="text-center sm:text-left">Nos Équipes jeunes</H2>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {equipesJeunes.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      )}

      {/* Section équipes académie*/}
      {equipesAcademie.length > 0 && (
        <section className="mb-12 space-y-6 sm:mb-16 sm:space-y-8 lg:mb-20">
          <H2 className="text-center sm:text-left">Nos Équipes à l&apos;Académie</H2>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {equipesAcademie.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      )}
      {/* Section équipes mini*/}
      {equipesMini.length > 0 && (
        <section className="mb-12 space-y-6 sm:mb-16 sm:space-y-8 lg:mb-20">
          <H2 className="text-center sm:text-left">Nos Équipes mini</H2>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {equipesMini.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

type HeroCardProps = { team: ReturnType<TeamEntity["toObject"]> }
function HeroCard({ team }: Readonly<HeroCardProps>) {
  return (
    <div className="group relative">
      <div
        className={cn(
          "bg-background/90 border-border/50 hover:border-primary/40 group-hover:shadow-3xl relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-video overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm transition-all duration-500 sm:rounded-3xl sm:shadow-2xl"
        )}
      >
        {/* Image de fond */}
        <div className="absolute inset-0 aspect-video size-full">
          <Image
            src={team.image ?? "/images/logo.png"}
            alt={team.name}
            fill
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

        {/* Contenu */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 sm:p-8 lg:p-12">
            <div className="flex items-end justify-between gap-4 lg:gap-6">
              <div className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-0">
                <h2 className="text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  {team.name}
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Badge variant="default" className="text-xs sm:text-sm">
                    {team.category}
                  </Badge>
                  {team.level !== Level.Académie && team.level !== Level.Ecole && (
                    <Badge variant="default" className="text-xs sm:text-sm">
                      {team.level}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Coach Avatars - à droite */}
              <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                {team.coachs
                  .filter((coach) => coach.image)
                  .map((coach) => (
                    <div key={coach.id} className="group/avatar relative">
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-sm transition-all duration-300 group-hover/avatar:bg-white/30" />
                      <Avatar className="relative h-12 w-12 border-2 border-white/30 backdrop-blur-sm transition-transform duration-300 group-hover/avatar:scale-110 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                        <AvatarImage src={coach.image} className="object-cover" />
                        <AvatarFallback className="bg-white/20 text-xs text-white backdrop-blur-sm sm:text-sm">
                          {coach.first_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type TeamCardProps = { team: ReturnType<TeamEntity["toObject"]> }
function TeamCard({ team }: Readonly<TeamCardProps>) {
  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100 sm:rounded-2xl lg:blur-xl" />

      <div
        className={cn(
          "bg-background/90 border-border/50 hover:border-primary/40 relative aspect-[4/3] sm:aspect-video overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:shadow-xl sm:rounded-2xl"
        )}
      >
        {/* Image principale */}
        <div className="absolute inset-0 size-full">
          <Image
            src={team.image?.length ? team.image : "/images/team-placeholder.avif"}
            alt={team.name}
            fill
            className="size-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge académie */}
        {(team.level === Level.Académie || team.level === Level.Ecole) && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <Badge variant="default" className="text-xs sm:text-sm">
              <Star className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              {team.level}
            </Badge>
          </div>
        )}

        {/* Contenu texte */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white transition-all duration-300 group-hover:scale-105 sm:text-xl lg:text-2xl truncate">
                {team.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="text-xs">
                  {team.category.join(" & ")}
                </Badge>
                {team.level !== Level.Académie && team.level !== Level.Ecole && (
                  <Badge variant="default" className="text-xs">
                    {team.level}
                  </Badge>
                )}
              </div>
            </div>

            {/* Coach Avatars - à droite */}
            <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
              {team.coachs
                .filter((coach) => coach.image)
                .slice(0, 2) // Limiter à 2 coachs sur mobile
                .map((coach) => (
                  <div key={coach.id} className="group/avatar relative">
                    <div className="absolute inset-0 rounded-full bg-white/10 blur-sm transition-all duration-300 group-hover/avatar:bg-white/20" />
                    <Avatar className="relative h-8 w-8 transition-transform duration-300 group-hover/avatar:scale-110 sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                      <AvatarImage src={coach.image} className="object-cover" />
                      <AvatarFallback className="bg-white/20 text-xs text-white backdrop-blur-sm">
                        {coach.first_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
