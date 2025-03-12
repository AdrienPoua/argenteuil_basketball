'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Form from './Form';
import Match from '@/models/Match';

type PropsType = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  match: ReturnType<Match['toPlainObject']>;
  onSuccess: () => void;
};

export function EditMatchDialog({ isOpen, onOpenChange, match, onSuccess }: Readonly<PropsType>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 gap-1 text-xs'>
          <Pencil className='h-3 w-3' />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='font-secondary text-xl font-bold'>Modifier le match</DialogTitle>
        </DialogHeader>
        <Form match={match} setIsEditing={() => onOpenChange(false)} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
