'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MatchEntity } from '@/core/domain/entities/match.entity'
import { TeamEntity } from '@/core/domain/entities/team.entity'
import { updateMatch } from '@/core//presentation/actions/matchs/update'
import { Loading } from '@/components/ui/loading'

type PropsType = {
  currentMatch: MatchEntity
  actions: {
    success: () => void
  }
  currentTeam: TeamEntity | null
}

export default function UpdateAmicalMatchForm({
  currentMatch,
  actions,
  currentTeam,
}: Readonly<PropsType>) {
  const updateMatchSchema = z.object({
    nomEquipe2: z.string().min(2, "Le nom de l'équipe doit contenir au moins 2 caractères"),
    date: z.string().min(1, 'La date est obligatoire'),
    horaire: z.coerce
      .number()
      .int()
      .min(0, "L'horaire est obligatoire")
      .max(2359, "Le format de l'horaire est incorrect, ex: 1030 pour 10h30, 1530 pour 15h30"),
    salle: z.string().min(1, 'La salle est obligatoire'),

    arbitre1: z.string().optional(),
    arbitre2: z.string().optional(),
    marqueur: z.string().optional(),
    chronometreur: z.string().optional(),
  })
  type UpdateMatchFormValues = z.infer<typeof updateMatchSchema>

  const form = useForm<UpdateMatchFormValues>({
    resolver: zodResolver(updateMatchSchema),
    defaultValues: {
      nomEquipe2: currentMatch?.nomEquipe2 ?? undefined,
      date: currentMatch?.date ?? undefined,
      horaire: currentMatch?.horaire ?? undefined,
      salle: currentMatch?.salle ?? undefined,
      arbitre1: currentMatch?.arbitre1 ?? undefined,
      arbitre2: currentMatch?.arbitre2 ?? undefined,
      marqueur: currentMatch?.marqueur ?? undefined,
      chronometreur: currentMatch?.chronometreur ?? undefined,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: UpdateMatchFormValues) => {
      const payload = {
        ...data,
        id: currentMatch.id,
      }
      await updateMatch(payload)
    },
    onSuccess: () => {
      form.reset()
      actions.success()
      toast.success('Match modifié avec succès.')
    },
    onError: (error: Error) => {
      console.error("Erreur lors de l'enregistrement:", error)
      toast.error("Une erreur est survenue lors de l'enregistrement.")
    },
  })

  const onSubmit = async (data: UpdateMatchFormValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6 rounded-md bg-muted/10 p-4">
          <h3 className="font-medium">Détails du match</h3>
          <div className="mt-2 text-sm">
            <p>
              <strong>Équipe domicile:</strong> {currentMatch.nomEquipe1}
            </p>
            <p>
              <strong>Équipe extérieure:</strong> {currentMatch.nomEquipe2}
            </p>
            <p>
              <strong>Score:</strong>{' '}
              {`${currentMatch.resultatEquipe1} - ${currentMatch.resultatEquipe2}`}
            </p>
            <p>
              <strong>Date:</strong> {currentMatch.date}
            </p>
            <p>
              <strong>Horaire:</strong> {currentMatch.horaire.toString().slice(0, 2)}h
              {currentMatch.horaire.toString().slice(2)}
            </p>
            <p>
              <strong>Salle:</strong> {currentMatch.salle}
            </p>
            {currentTeam && (
              <>
                <p>
                  <strong>Championnat:</strong>{' '}
                  {currentTeam?.competitions.map((competition) => competition.label).join(' - ')}
                </p>
                <p>
                  <strong>Coach(s):</strong>{' '}
                  {currentTeam?.coachs
                    .map((coach) => `${coach.first_name} ${coach.last_name}`)
                    .join(', ')}
                </p>
                {currentTeam?.assistantsCoach?.length > 0 && (
                  <p>
                    <strong>Assistant(s):</strong>{' '}
                    {currentTeam?.assistantsCoach
                      .map((assistant) => `${assistant.first_name} ${assistant.last_name}`)
                      .join(', ')}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nomEquipe2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Équipe extérieure</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={mutation.isPending || !currentMatch.isAmical}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    disabled={mutation.isPending || !currentMatch.isAmical}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="horaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horaire (ex: 1830 pour 18h30)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    disabled={mutation.isPending || !currentMatch.isAmical}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="arbitre1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arbitre 1</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled={mutation.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arbitre2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arbitre 2</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled={mutation.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="marqueur"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marqueur</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} disabled={mutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chronometreur"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chronométreur</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} disabled={mutation.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {mutation.isError && (
          <div className="text-sm text-destructive">{mutation.error?.message}</div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" disabled={mutation.isPending}>
            Annuler
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Loading /> : 'Mettre à jour'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
