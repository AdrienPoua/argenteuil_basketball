'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

type DeleteMatchDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
};

export function DeleteMatchDialog({ isOpen, onOpenChange, onDelete, isDeleting }: DeleteMatchDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size='sm'
          variant='outline'
          className='h-8 gap-1 border-red-200 bg-red-50 text-xs text-red-600 hover:bg-red-100 hover:text-red-700'
        >
          <Trash2 className='h-3 w-3' />
          Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce match ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-4 flex gap-2'>
          <Button onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button variant='destructive' onClick={onDelete} disabled={isDeleting}>
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
