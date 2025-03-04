'use client';
import { useState } from 'react';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { formSchema } from '../schemas/form.schema';
import { useCustomForm } from '../actions/client.action';
import { toast } from '@/hooks/use-toast';

type FAQFormProps = {
  onSuccess?: () => void;
};

export default function FAQForm({ onSuccess }: Readonly<FAQFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useCustomForm();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Impossible de créer la FAQ');
      }

      toast({
        title: 'FAQ créée',
        description: 'La FAQ a été créée avec succès',
        variant: 'success',
      });

      form.reset();
      router.refresh();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la FAQ. Veuillez réessayer.',
        variant: 'destructive',
      });
      console.error('Error creating FAQ:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto w-full space-y-6'>
        <FormField
          control={form.control}
          name='question'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea placeholder='Votre question ici' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='answer'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réponse</FormLabel>
              <FormControl>
                <Textarea placeholder='Votre réponse ici' className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Envoi en cours...' : 'Enregistrer'}
        </Button>
      </form>
    </Form>
  );
}
