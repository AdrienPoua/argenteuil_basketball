'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Form from './Form';
import Match from '@/models/Match';

type PropsType = {
  match: ReturnType<Match['toPlainObject']>;
  onSuccess: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};
export function EditDialog({ isOpen, onOpenChange, match, onSuccess }: Readonly<PropsType>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='h-8 w-full gap-1'>
          <Pencil className='h-4 w-4' />
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
