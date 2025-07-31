'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createInscription } from '@/core//presentation/actions/inscriptions/createInscription';
import { ErrorHandler } from '@/core/shared/error/ErrorHandler';

type PropsType = {
  setOpen: (open: boolean) => void;
};

export function InscriptionForm({ setOpen }: PropsType) {
  const formSchema = z.object({
    lastName: z.string().min(2, 'Le nom est requis'),
    firstName: z.string().min(2, 'Le prénom est requis'),
    email: z.string().email('Email invalide'),
    dateOfBirth: z.string().min(8, 'Date de naissance requise'),
    phoneNumber: z.string().min(8, 'Téléphone requis'),
    gender: z.enum(['Masculin', 'Féminin'], {
      required_error: 'Le genre est requis',
    }),
    surclassement: z.boolean().optional(),
    typeInscription: z.enum(['RENOUVELLEMENT', 'MUTATION', 'NOUVELLE_LICENCE', 'RENOUVELLEMENT_SANS_MUTATION'], {
      required_error: "Le type d'inscription est requis",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: '',
      gender: undefined,
      surclassement: false,
      typeInscription: undefined,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createInscription(values);
      setOpen(false);
      toast.success('Vous recevrez un email avec le lien de pré-inscription sous réserve de validation');
      form.reset();
    } catch (error) {
      const normalizedError = ErrorHandler.normalize(error);
      ErrorHandler.log(normalizedError);
      toast.error(ErrorHandler.userMessage(error));
    }
    setOpen(false);
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dateOfBirth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} value={field.value?.toString() ?? ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Choisir un genre' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Masculin'>Masculin</SelectItem>
                  <SelectItem value='Féminin'>Féminin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type='tel' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='typeInscription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d&apos;inscription</FormLabel>
              <Select onValueChange={field.onChange} value={field.value?.toString() ?? ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Choisir un type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={'RENOUVELLEMENT'}>
                    Renouvellement : J&apos;étais au club la saison dernière{' '}
                  </SelectItem>
                  <SelectItem value={'MUTATION'}>
                    {' '}
                    Mutation : J&apos;étais dans un autre club la saison dernière{' '}
                  </SelectItem>
                  <SelectItem value={'NOUVELLE_LICENCE'}>
                    Nouvelle licence : Je n&apos;ai jamais eu de licence en club
                  </SelectItem>
                  <SelectItem value={'RENOUVELLEMENT_SANS_MUTATION'}>
                    Renouvellement sans mutation : J&apos;ai déjà eu une licence, mais pas l&apos;année dernière
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='surclassement'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center gap-2 space-y-0'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Surclassement</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Envoyer la pré-inscription
        </Button>
      </form>
    </Form>
  );
}
