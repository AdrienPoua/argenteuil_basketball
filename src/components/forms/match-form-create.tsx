'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { TeamEntity } from '@/core/domain/entities/team.entity';
import { createMatch } from '@/core//presentation/actions/matchs/create';
import { Loading } from '@/components/ui/loading';
type PropsType = {
  actions: {
    success: () => void;
  };
  teams: TeamEntity[];
};

export default function CreateMatchForm({ actions, teams }: PropsType) {
  const createMatchSchema = z.object({
    teamId: z.string(),
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
  });

  type CreateMatchFormValues = z.infer<typeof createMatchSchema>;

  const form = useForm<CreateMatchFormValues>({
    resolver: zodResolver(createMatchSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateMatchFormValues) => {
      await createMatch(data);
    },
    onSuccess: () => {
      form.reset();
      actions.success();
      toast.success('Match créé avec succès.');
    },
    onError: (error: Error) => {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    },
  });

  const onSubmit = async (data: CreateMatchFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='teamId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Équipe domicile</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    disabled={mutation.isPending}
                    required
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Sélectionnez une équipe' />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nomEquipe2'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Équipe extérieure</FormLabel>
                <FormControl>
                  <Input {...field} disabled={mutation.isPending} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type='date' {...field} disabled={mutation.isPending} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='horaire'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horaire (ex: 1830 pour 18h30)</FormLabel>
                <FormControl>
                  <Input type='number' {...field} disabled={mutation.isPending} required />
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
                <Input {...field} disabled={mutation.isPending} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className='text-center text-lg font-medium'>OFFICIELS</h3>
        <Separator />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='arbitre1'
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
            name='arbitre2'
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

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='marqueur'
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
            name='chronometreur'
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

        {mutation.isError && <div className='text-sm text-destructive'>{mutation.error?.message}</div>}

        <div className='flex justify-end gap-2 pt-4'>
          <Button type='button' variant='outline' disabled={mutation.isPending}>
            Annuler
          </Button>
          <Button type='submit' disabled={mutation.isPending || !form.formState.isValid}>
            {mutation.isPending ? <Loading /> : 'Créer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
