import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Inscription } from '@prisma/client';
import { Edit } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InscriptionSchema } from '@/lib/validation/Inscription';
import InscriptionForm from '@/components/forms/InscriptionForm';

export function EditDialog({ inscription }: Readonly<{ inscription: Inscription }>) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Configuration du formulaire avec react-hook-form
  const form = useForm<z.infer<typeof InscriptionSchema>>({
    resolver: zodResolver(InscriptionSchema),
    defaultValues: {
      nom: inscription.nom,
      prenom: inscription.prenom,
      numero: inscription.numero,
      email: inscription.email,
      dateNaissance: format(new Date(inscription.dateNaissance), 'yyyy-MM-dd'),
      surclassement: inscription.surclassement,
      Renouvellement: inscription.Renouvellement,
      nouvelleLicence: inscription.nouvelleLicence,
      mutation: inscription.mutation,
      RenouvellementSansMutation: inscription.RenouvellementSansMutation,
    },
  });

  // Configuration de useMutation
  const mutationFn = async (values: z.infer<typeof InscriptionSchema>): Promise<void> => {
    try {
      const response = await fetch(`/api/inscriptions/${inscription.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...inscription, ...values, dateNaissance: new Date(values.dateNaissance) }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'inscription");
      }

      return;
    } catch (error) {
      console.error('Error updating inscription:', error);
      throw error instanceof Error ? error : new Error('Unknown error');
    }
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('inscriptions');
      toast({
        title: 'Inscription modifiée',
        description: "L'inscription a été modifiée avec succès",
        variant: 'success',
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Erreur',
        description: "Une erreur est survenue lors de la modification de l'inscription",
        variant: 'destructive',
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline'>
          <Edit className='mr-2 h-4 w-4' />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Modifier l&apos;inscription</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l&apos;inscription de {inscription.nom} {inscription.prenom}
          </DialogDescription>
        </DialogHeader>
        <InscriptionForm form={form} mutation={mutation} />
      </DialogContent>
    </Dialog>
  );
}
