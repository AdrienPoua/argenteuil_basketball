import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from '@/hooks/use-toast';
import { Inscription } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

export const DeleteDialog = ({ inscription }: { inscription: Inscription }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutationFn = async (id: string) => {
    const response = await fetch(`/api/inscriptions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'inscription");
    }

    return response.json();
  };

  const mutation = useMutation((id: string) => mutationFn(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('inscriptions');
      toast({
        title: 'Inscription supprimée avec succès',
        description: "L'inscription a été supprimée avec succès",
        variant: 'success',
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de l'inscription:", error);
      toast({
        title: "Erreur lors de la suppression de l'inscription",
        description: 'Veuillez réessayer plus tard',
        variant: 'destructive',
      });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive'>Supprimer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription className='text-foreground'>
            Êtes-vous sûr de vouloir supprimer l&apos;inscription de {inscription.nom} {inscription.prenom} ? Cette
            action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)} disabled={mutation.isLoading}>
            Annuler
          </Button>
          <Button variant='destructive' onClick={() => mutation.mutate(inscription.id)} disabled={mutation.isLoading}>
            {mutation.isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Suppression...
              </>
            ) : (
              'Supprimer'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
