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
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ConvocationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isHomeMatch: boolean;
  convocationIsSent: boolean;
  convocationIsAsked: boolean;
};

export function ConvocationDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  isHomeMatch,
  convocationIsSent,
  convocationIsAsked,
}: Readonly<ConvocationDialogProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={
            convocationIsSent
              ? 'w-full border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800'
              : 'w-full bg-primary/90 hover:bg-primary'
          }
        >
          <Mail className='mr-2 h-4 w-4' />
          <span>{convocationIsSent ? 'Renvoyer la convocation' : 'Envoyer la convocation'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isHomeMatch ? 'Confirmer le renvoi' : 'Confirmer la demande'}</DialogTitle>
          <DialogDescription>
            {isHomeMatch
              ? 'Une convocation a déjà été envoyée pour ce match. Voulez-vous en envoyer une nouvelle ?'
              : 'Voulez-vous demander la convocation pour ce match ?'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex gap-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          {!isHomeMatch && convocationIsAsked ? (
            <Badge variant='outline' className='border-blue-300 bg-blue-100 text-blue-800'>
              Demande déjà envoyée
            </Badge>
          ) : (
            <Button onClick={onConfirm}>{isHomeMatch ? "Confirmer l'envoi" : 'Envoyer la demande'}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
