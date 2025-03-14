'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Form from './Form';
import Member from '@/models/Member';
import Team from '@/models/Team';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type EditMemberModalProps = {
  member: ReturnType<Member['toPlainObject']>;
  teams: ReturnType<Team['toPlainObject']>[];
};

export function EditMemberModal({ member, teams }: Readonly<EditMemberModalProps>) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onFormSubmitSuccess = () => {
    setOpen(false);
    toast({
      title: 'Membre modifié',
      description: `Les informations de ${member.name} ont été mises à jour avec succès.`,
      variant: 'success',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='icon'
          aria-label={`Modifier ${member.name}`}
          className='bg-primary text-primary-foreground hover:bg-primary/90'
        >
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
        <Form teams={teams} defaultValues={member} isModal={true} onSuccess={onFormSubmitSuccess} />
      </DialogContent>
    </Dialog>
  );
}
