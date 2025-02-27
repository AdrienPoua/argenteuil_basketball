'use client';

import { PropsType, FormValues } from '../types/form.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMatchForm } from '../actions/client.action';
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
export default function MatchForm({ match, setIsEditing }: Readonly<PropsType>) {
  const form = useMatchForm(match);
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    const date = new Date(`${data.date}T${data.time}`);
    try {
      const response = await fetch(`/api/matchs/${match.id}`, {
        method: 'PUT',
        body: JSON.stringify({ date, salle: data.salle }),
      });
      if (!response.ok) {
        throw new Error('Failed to update match');
      }
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                  <Input type='date' {...field} />
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
                  <Input type='time' {...field} placeholder='Sélectionnez une heure' />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
