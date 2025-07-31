'use client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import H1 from '@/components/ui/H1'
import { MatchEntity } from '@/core/domain/entities/match.entity'
import ReservationTemplate from '@/core/infrastructure/resend/templates/reservation'
import { toDomain } from '@/core/infrastructure/supabase/mappers/match.mapper'
import { sendReservationEmail } from '@/core/presentation/actions/emails/reservationEmail'
import { getUpcomingMatchs } from '@/core/presentation/actions/matchs/getUpcomingMatchs'

export default function Page() {
  const [upcomingMatchs, setUpcomingMatchs] = useState<MatchEntity[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getMatchs = async () => {
      try {
        setLoading(true)
        const matchs = await getUpcomingMatchs()
        setUpcomingMatchs(matchs.map((match) => toDomain(match)))
      } catch (error) {
        console.error(error)
        toast.error('Erreur lors de la récupération des matchs')
      } finally {
        setLoading(false)
      }
    }

    getMatchs()
  }, [])

  const handleSendEmail = async () => {
    try {
      setLoading(true)
      await sendReservationEmail(upcomingMatchs)
      toast.success('Emails envoyés avec succès')
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de l'envoi des emails")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-screen-xl space-y-6 px-4 sm:space-y-8 sm:px-6 lg:px-8">
      <H1>Envoyer les emails</H1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            📧 Envoi d&apos;emails de réservation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="rounded-lg bg-blue-50 p-4 sm:p-6">
            <p className="text-sm text-blue-800 sm:text-base">
              💡 Cette page a pour but d&apos;envoyer à votre adresse email les prochains matchs de
              la saison. <br />
              Cela permet de transférer l&apos;email à la mairie pour la réservation des gymnases
              par exemple, <br />
              ou bien de transférer le planning par email aux coachs.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground sm:text-base">
              {`${upcomingMatchs.length} matchs à envoyer`}
            </div>

            <Button
              onClick={handleSendEmail}
              disabled={loading || upcomingMatchs.length === 0}
              className="w-full sm:w-auto"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer les emails'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {upcomingMatchs.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">📋 Aperçu de l&apos;email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-gray-50 p-4">
              <ReservationTemplate matchs={upcomingMatchs} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
