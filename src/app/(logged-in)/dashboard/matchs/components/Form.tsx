'use client';

import { PropsType, FormValues } from '../types/form.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useMatchForm } from '../actions/client.action';
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { useQueryClient } from 'react-query';

export type MatchFormProps = PropsType & {
  onSuccess?: () => void;
};

export default function MatchForm({ match, setIsEditing, onSuccess }: Readonly<MatchFormProps>) {
  const form = useMatchForm(match);
  // Récupérer le client React Query pour pouvoir invalider le cache
  const queryClient = useQueryClient();

  const onSubmit = async (data: FormValues) => {
    const date = new Date(`${data.date}T${data.time}`);
    try {
      const response = await fetch(`/api/matchs/${match.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          date,
          salle: data.salle,
          isConvocationRecu: data.isConvocationRecu,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update match');
      }

      // Invalider toutes les requêtes qui commencent par 'matchs'
      // Cela correspond au format ['matchs', month, competition, place, showUpcomingOnly] dans useFilters.ts
      queryClient.invalidateQueries(['matchs']);

      // Fermer le formulaire
      setIsEditing(false);

      // Appel du callback onSuccess s'il existe
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 font-secondary'>
        <div>
          <Badge variant='match'>{match.championnat}</Badge>
          <CardHeader className='mb-3 flex flex-row items-center justify-between'>
            <CardTitle className='mb w-full text-center text-lg'>
              Journée {match.matchNumberJournee} - Match n°{match.matchNumber}
            </CardTitle>
          </CardHeader>
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date du match</FormLabel>
                <FormControl>
                  <Input type='date' {...field} className='bg-foreground' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure du match</FormLabel>
                <FormControl>
                  <Input type='time' {...field} placeholder='Sélectionnez une heure' className='bg-foreground' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='salle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salle</FormLabel>
              <FormControl>
                <Input {...field} className='bg-foreground' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!match.isHome && (
          <FormField
            control={form.control}
            name='isConvocationRecu'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Convocation reçue</FormLabel>
                  <FormDescription>Marquez comme reçue si vous avez reçu la convocation pour ce match</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <div className='flex justify-end space-x-2'>
          <Button type='button' onClick={() => setIsEditing(false)}>
            Annuler
          </Button>
          <Button type='submit'>Sauvegarder</Button>
        </div>
      </form>
    </Form>
  );
}
