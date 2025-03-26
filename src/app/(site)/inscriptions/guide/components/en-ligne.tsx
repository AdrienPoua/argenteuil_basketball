'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InscriptionForm from '@/components/forms/InscriptionForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InscriptionSchema } from '@/lib/validation/Inscription';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from 'react-query';
import { Badge } from '@/components/ui/badge';

export default function EnLigne() {
  return (
    <div className='mx-auto flex justify-center gap-8 font-secondary'>
      <Tutorial />
      <Form />
    </div>
  );
}

const Tutorial = () => {
  return (
    <div className='flex max-w-3xl flex-1 flex-col gap-6 rounded-xl border-2 border-primary p-8'>
      <h2 className='mb-2 text-center font-main text-2xl'>Comment s&apos;inscrire ?</h2>
      <div className='flex flex-col gap-6'>
        <div className='flex items-start gap-4'>
          <StepNumber number={1} />
          <p className='text-lg'>
            Remplissez le formulaire ci-contre avec vos informations personnelles pour initier votre inscription au club
            de basketball d&apos;Argenteuil.
          </p>
        </div>
        <div className='flex items-start gap-4'>
          <StepNumber number={2} />
          <p className='text-lg'>
            Après vérification de vos informations, vous recevrez un email contenant un lien sécurisé pour finaliser
            votre inscription en ligne. <br />{' '}
            <span className='italic text-primary'>Cela peut prendre plusieurs jours.</span>
          </p>
        </div>
        <div className='flex items-start gap-4'>
          <StepNumber number={3} />
          <p className='text-lg'>
            Une fois le paiement effectué, un email de confirmation vous sera envoyé avec votre fiche d&apos;inscription
            officielle.
          </p>
        </div>
      </div>
    </div>
  );
};

const Form = () => {
  const form = useForm<z.infer<typeof InscriptionSchema>>({
    resolver: zodResolver(InscriptionSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      numero: '',
      email: '',
      dateNaissance: '',
      surclassement: false,
      Renouvellement: false,
      nouvelleLicence: false,
      mutation: false,
      RenouvellementSansMutation: false,
    },
  });
  const { toast } = useToast();
  const mutationFn = async (data: z.infer<typeof InscriptionSchema>) => {
    try {
      const response = await fetch('/api/inscriptions', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du formulaire');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors de la soumission du formulaire');
    }
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      toast({
        title: 'Inscription réussie',
        description: 'Votre inscription a été soumise avec succès',
        variant: 'success',
      });
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Erreur lors de la soumission du formulaire',
        description: 'Veuillez réessayer plus tard',
        variant: 'destructive',
      });
    },
  });
  if (mutation.isSuccess) {
    return <Badge className='bg-green-500 text-2xl text-white hover:bg-green-500'>Inscription prise en compte</Badge>;
  }
  return (
    <Card className='flex-1 rounded-xl py-0'>
      <CardHeader>
        <CardTitle>Formulaire d&apos;inscription</CardTitle>
        <CardDescription>
          Remplissez ce formulaire pour vous inscrire au club de basketball d&apos;Argenteuil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InscriptionForm form={form} mutation={mutation} />
      </CardContent>
    </Card>
  );
};

const StepNumber = ({ number }: { number: number }) => {
  return (
    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white'>
      {number}
    </div>
  );
};
