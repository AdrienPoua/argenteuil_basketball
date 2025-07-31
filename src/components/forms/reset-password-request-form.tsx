'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createClient } from '@/core/infrastructure/supabase/clients/client';
import club from '@/core/shared/config/club';
const formSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});

export function ResetPasswordRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `https://${club.domain}/reset-password/update`,
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de la demande:', error);
      form.setError('root', {
        message: 'Une erreur est survenue. Veuillez réessayer.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Alert className='border-primary bg-primary/10'>
        <CheckCircle2 className='h-4 w-4 text-primary' />
        <AlertTitle>Email envoyé</AlertTitle>
        <AlertDescription className='mt-2'>
          Si un compte existe avec cette adresse email, vous recevrez un email avec les instructions pour réinitialiser
          votre mot de passe.
        </AlertDescription>
        <div className='mt-4'>
          <Link href='/login' className='whitespace-nowrap text-primary hover:underline'>
            Retour à la page de connexion
          </Link>
        </div>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='exemple@domaine.com' {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
        </Button>
      </form>
    </Form>
  );
}
