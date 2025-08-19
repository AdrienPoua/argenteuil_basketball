'use client'
import { Mail, Phone, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/core/shared/utils/cn'
import { toast } from 'sonner'
import { useState } from 'react'

interface Team {
  id: string
  name: string
  category: string[]
  gender: string
  level: string
  image?: string
}

interface Coach {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string[]
  image?: string
  contact_privacy: {
    showEmail: boolean
    showPhone: boolean
  }
  created_at: string
  teams: Team[]
}

interface CoachCardProps {
  coach: Coach
}

export default function CoachCard({ coach }: Readonly<CoachCardProps>) {
  const [imageError, setImageError] = useState(false)

  const onEmailClick = () => {
    navigator.clipboard.writeText(coach.email)
    toast.success('Email copié dans le presse-papiers')
  }
  const onPhoneClick = () => {
    navigator.clipboard.writeText(coach.phone)
    toast.success('Numéro de téléphone copié dans le presse-papiers')
  }
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/10 p-4 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 sm:p-6 lg:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 blur-sm transition-all duration-500 group-hover:opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Large Avatar with enhanced effects */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 blur-lg transition-all duration-500 group-hover:scale-110 group-hover:opacity-70" />

          <Avatar className="sm:border-3 relative h-20 w-20 border-2 border-primary/20 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-2xl sm:h-24 sm:w-24 lg:h-32 lg:w-32 lg:border-4">
            <AvatarImage
              src={
                imageError
                  ? '/images/default/avatar.png'
                  : (coach.image ?? '/images/default/avatar.png')
              }
              className="object-cover transition-all duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            <AvatarFallback className="bg-gradient-to-br from-primary/30 to-accent/30 text-lg font-bold text-primary sm:text-xl lg:text-2xl">
              {coach.first_name?.charAt(0) ?? coach.last_name?.charAt(0) ?? 'E'}
            </AvatarFallback>
          </Avatar>

          {/* Enhanced online indicator */}
          <div className="sm:border-3 absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-green-500 opacity-0 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 sm:-bottom-2 sm:-right-2 sm:h-5 sm:w-5 lg:h-6 lg:w-6 lg:border-4">
            <div className="absolute inset-0.5 animate-pulse rounded-full bg-green-400 sm:inset-1" />
          </div>
        </div>

        {/* Name with enhanced typography */}
        <div className="space-y-1 text-center sm:space-y-2">
          <h3 className="text-lg font-bold text-foreground transition-all duration-300 group-hover:scale-105 group-hover:text-primary sm:text-xl lg:text-2xl">
            {coach.first_name}
          </h3>

          {coach.last_name && (
            <p className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:text-base">
              {coach.last_name}
            </p>
          )}
        </div>

        {/* Teams Section */}
        {coach.teams && coach.teams.length > 0 && (
          <div className="w-full space-y-2 sm:space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-primary sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Équipes entraînées</span>
            </div>

            {/* Teams details */}
            <div className="space-y-1.5 sm:space-y-2">
              {coach.teams.slice(0, 3).map((team) => (
                <div
                  key={team.id}
                  className="rounded-lg bg-primary/10 p-2 text-xs sm:p-3 sm:text-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary" className="font-secondary text-xs">
                      {team.category.join(' & ')}
                    </Badge>
                    <Badge variant="outline" className="font-secondary text-xs">
                      {team.level}
                    </Badge>
                  </div>
                </div>
              ))}
              {coach.teams.length > 3 && (
                <div className="text-center text-xs text-muted-foreground">
                  +{coach.teams.length - 3} autre{coach.teams.length - 3 > 1 ? 's' : ''} équipe
                  {coach.teams.length - 3 > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced contact info */}
        <div className="w-full space-y-3 sm:space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="space-y-2 sm:space-y-3">
            {coach.contact_privacy.showEmail && coach.email && (
              <div className="group/item flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-primary/10 p-2 text-xs transition-all duration-300 hover:scale-105 hover:bg-muted/50 sm:space-x-3 sm:p-3 sm:text-sm">
                <Mail className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                <button className="min-w-0 truncate font-secondary" onClick={onEmailClick}>
                  {coach.email}
                </button>
              </div>
            )}

            {coach.contact_privacy.showPhone && coach.phone && (
              <div className="group/item flex cursor-pointer items-center justify-center space-x-2 rounded-lg bg-primary/10 p-2 text-xs transition-all duration-300 hover:scale-105 hover:bg-muted/50 sm:space-x-3 sm:p-3 sm:text-sm">
                <Phone className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                <button className="font-secondary" onClick={onPhoneClick}>
                  {coach.phone}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
