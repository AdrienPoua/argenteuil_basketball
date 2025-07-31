'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/core//presentation/hooks/divers/useAuth';

const formSchema = z.object({
  email: z.string().email('Adresse email invalide').min(3, "L'email est requis"),
  password: z.string().min(3, 'Le mot de passe est requis'),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function Index() {
  const { login, loading } = useAuth();

  // Définir le formulaire
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Fonction de soumission
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      form.setError('root', {
        message: 'Identifiants incorrects. Veuillez réessayer.',
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='exemple@domaine.com' type='email' disabled={loading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between'>
                <FormLabel>Mot de passe</FormLabel>
                <Link href='/reset-password/request' className='text-sm text-primary hover:underline'>
                  Mot de passe oublié ?
                </Link>
              </div>
              <FormControl>
                <Input type='password' disabled={loading} {...field} />
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

        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </form>
    </Form>
  );
}
