'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import Form from './Form';
import Team from '@/models/Team';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type AddMemberModalProps = {
  teams: ReturnType<Team['toPlainObject']>[];
};

export function AddMemberModal({ teams }: Readonly<AddMemberModalProps>) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onFormSubmitSuccess = () => {
    setOpen(false);
    toast({
      title: 'Membre ajouté',
      description: 'Le nouveau membre a été ajouté avec succès.',
      variant: 'success',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='blackAndWhite'>
          <PlusIcon className='h-4 w-4' />
          Ajouter un membre
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='font-secondary text-xl font-bold'>Ajouter un nouveau membre</DialogTitle>
        </DialogHeader>
        <Form teams={teams} isModal={true} onSuccess={onFormSubmitSuccess} />
      </DialogContent>
    </Dialog>
  );
}
