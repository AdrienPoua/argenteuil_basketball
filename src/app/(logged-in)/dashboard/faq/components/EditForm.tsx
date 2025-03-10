'use client';
import { useState } from 'react';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { formSchema } from '../schemas/form.schema';
import { useEditFAQForm } from '../actions/client.action';
import { Prisma } from '@prisma/client';
import { toast } from '@/hooks/use-toast';

type EditFAQFormProps = {
  faq: Prisma.FAQGetPayload<{}>;
  onCancel: () => void;
  onSuccess: () => void;
};

export default function EditFAQForm({ faq, onCancel, onSuccess }: EditFAQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useEditFAQForm(faq);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/faq/${faq.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: data.question,
          answer: data.answer,
          position: faq.position,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update FAQ');
      }

      router.refresh();
      toast({
        title: 'FAQ modifiée',
        description: 'La FAQ a été mise à jour avec succès.',
        variant: 'success',
      });
      onSuccess();
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la FAQ.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                <Textarea placeholder='Votre réponse ici' className='min-h-[120px] resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-2'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Annuler
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
