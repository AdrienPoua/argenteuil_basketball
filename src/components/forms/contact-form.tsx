'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, CheckCircle, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { sendContactEmail } from '@/core//presentation/actions/emails/contactEmail';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères.',
  }),
  email: z.string().email({
    message: "L'adresse email est invalide.",
  }),
  message: z.string().min(10, {
    message: 'Le message doit contenir au moins 10 caractères.',
  }),
});

type PropsType = {
  onSuccess: () => void;
  onError: () => void;
  error: boolean;
  success: boolean;
};

export default function ContactForm({ onSuccess, onError, error, success = true }: Readonly<PropsType>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await sendContactEmail(data);
      onSuccess();
    } catch (error) {
      console.error(error);
      onError();
    }
  };
  if (error) return <ErrorComponent />;
  if (success) return <SuccessComponent />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Michael Jordan' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder='michael.jordan@gmail.com' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Bonjour, je vous contacte concernant...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Envoyer
        </Button>
      </form>
    </Form>
  );
}

const ErrorComponent = () => {
  return (
    <div className='rounded-lg border border-destructive/20 bg-destructive/10 p-6 shadow-sm'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20'>
            <AlertTriangle className='h-5 w-5 text-destructive' />
          </div>
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='mb-2 text-lg font-semibold text-destructive'>Erreur lors de l&apos;envoi</h3>
          <p className='mb-4 text-sm text-destructive/80'>
            Une erreur est survenue lors de l&apos;envoi de votre message. <br /> Cela surement dû à un problème
            temporaire de notre côté.
          </p>
        </div>
      </div>
    </div>
  );
};

const SuccessComponent = () => {
  return (
    <div className='rounded-lg border border-primary/20 bg-primary/10 p-6 shadow-sm'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/20'>
            <CheckCircle className='h-5 w-5 text-primary' />
          </div>
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='mb-2 text-lg font-semibold text-primary'>Message envoyé avec succès !</h3>
          <p className='mb-4 text-sm text-primary/80'>
            Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais, généralement sous
            24 heures.
          </p>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <Button
              onClick={() => window.location.reload()}
              variant='outline'
              className='border-primary/30 text-primary hover:bg-primary/10'
            >
              <Mail className='mr-2 h-4 w-4' />
              Envoyer un autre message
            </Button>
          </div>
        </div>
      </div>
      <div className='mt-4 rounded-md border border-primary/10 bg-primary/5 p-3'>
        <p className='text-xs text-primary/70'>
          💡 <strong>Conseil :</strong> Ajoutez notre adresse email à vos contacts pour être sûr de recevoir notre
          réponse.
        </p>
      </div>
    </div>
  );
};
