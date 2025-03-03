'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createMatchSchema, CreateMatchFormValues } from '../schemas/create-match.schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DialogClose } from '@/components/ui/dialog';

export default function CreateMatchForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<CreateMatchFormValues>({
    resolver: zodResolver(createMatchSchema),
    defaultValues: {
      date: '',
      time: '',
      opponentTeam: '',
      competition: '',
      salle: '',
    },
  });

  const onSubmit = async (data: CreateMatchFormValues) => {
    setIsSubmitting(true);
    try {
      const date = new Date(`${data.date}T${data.time}`);

      // Generate a UUID-like unique ID (simplified for demonstration)
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Create a simplified match object with required fields
      const matchData = {
        id,
        numero: Math.floor(Math.random() * 10000), // Random number for demonstration
        numeroJournee: 1,
        idPoule: 1,
        idOrganismeEquipe1: 11851, // Club ID as seen in the Match model
        idOrganismeEquipe2: 0, // Placeholder
        nomEquipe1: 'Argenteuil', // Your team (hardcoded)
        nomEquipe2: data.opponentTeam,
        resultatEquipe1: null,
        resultatEquipe2: null,
        date,
        salle: data.salle || null,
        penaliteEquipe1: false,
        penaliteEquipe2: false,
        forfaitEquipe1: false,
        forfaitEquipe2: false,
        defautEquipe1: false,
        defautEquipe2: false,
        validee: false,
        remise: false,
        joue: false,
        handicap1: null,
        handicap2: null,
        dateSaisieResultat: null,
        creation: new Date().toISOString(),
        modification: null,
        classementPouleAssociee: null,
        competition: data.competition, // Use the user-provided competition value
        correspondant: null,
        convocationIsSent: false,
      };

      const response = await fetch('/api/matchs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),
      });

      if (!response.ok) {
        throw new Error('Failed to create match');
      }

      // Reset form and refresh the page
      form.reset();
      router.refresh();
    } catch (error) {
      console.error('Error creating match:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date du match</FormLabel>
                <FormControl>
                  <Input type='date' {...field} className='bg-white' />
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
                  <Input type='time' {...field} placeholder='Sélectionnez une heure' className='bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='opponentTeam'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Équipe adverse</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nom de l'équipe adverse" className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='competition'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compétition</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Nom de la compétition' className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='salle'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salle (optionnel)</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Lieu du match' className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end space-x-2'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Annuler
            </Button>
          </DialogClose>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Création...' : 'Ajouter le match'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
