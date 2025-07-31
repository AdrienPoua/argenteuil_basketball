'use client'
import { Mail, Phone, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/core/shared/utils/cn'
import { toast } from 'sonner'

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
  const onEmailClick = () => {
    navigator.clipboard.writeText(coach.email)
    toast.success('Email copié dans le presse-papiers')
  }
  const onPhoneClick = () => {
    navigator.clipboard.writeText(coach.phone)
    toast.success('Numéro de téléphone copié dans le presse-papiers')
  }
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/30 p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />

      {/* Subtle animated border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 blur-sm transition-all duration-500 group-hover:opacity-50" />

      {/* Badge Coach */}
      <Badge className={cn('absolute right-6 top-6 z-10 text-xs font-medium shadow-sm')}>
        Entraîneur
      </Badge>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Large Avatar with enhanced effects */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 opacity-0 blur-lg transition-all duration-500 group-hover:scale-110 group-hover:opacity-70" />

          <Avatar className="relative h-32 w-32 border-4 border-primary/20 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-2xl">
            <AvatarImage
              src={coach.image ?? '/placeholder.svg'}
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
            <AvatarFallback className="bg-gradient-to-br from-primary/30 to-accent/30 text-2xl font-bold text-primary">
              {coach.first_name?.charAt(0) ?? coach.last_name?.charAt(0) ?? 'E'}
            </AvatarFallback>
          </Avatar>

          {/* Enhanced online indicator */}
          <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full border-4 border-background bg-green-500 opacity-0 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">
            <div className="absolute inset-1 animate-pulse rounded-full bg-green-400" />
          </div>
        </div>

        {/* Name with enhanced typography */}
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-bold text-foreground transition-all duration-300 group-hover:scale-105 group-hover:text-primary">
            {coach.first_name}
          </h3>

          {coach.last_name && (
            <p className="text-base font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {coach.last_name}
            </p>
          )}
        </div>

        {/* Teams Section */}
        {coach.teams && coach.teams.length > 0 && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
              <Users className="h-4 w-4" />
              <span>Équipes entraînées</span>
            </div>

            {/* Teams details */}
            <div className="space-y-2">
              {coach.teams.slice(0, 3).map((team) => (
                <div key={team.id} className="rounded-lg bg-muted/20 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{team.name}</span>
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="font-secondary text-xs">
                        {team.category.join(' & ')}
                      </Badge>
                      <Badge variant="outline" className="font-secondary text-xs">
                        {team.level}
                      </Badge>
                    </div>
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
        <div className="w-full space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="space-y-3">
            {coach.contact_privacy.showEmail && coach.email && (
              <div className="group/item flex cursor-default items-center justify-center space-x-3 rounded-lg bg-muted/30 p-3 text-sm transition-all duration-300 hover:scale-105 hover:bg-muted/50">
                <Mail className="h-4 w-4" />
                <button className="font-secondary" onClick={onEmailClick}>
                  {coach.email}
                </button>
              </div>
            )}

            {coach.contact_privacy.showPhone && coach.phone && (
              <div className="group/item flex items-center justify-center space-x-3 rounded-lg bg-muted/30 p-3 text-sm transition-all duration-300 hover:scale-105 hover:bg-muted/50">
                <Phone className="h-4 w-4" />
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
