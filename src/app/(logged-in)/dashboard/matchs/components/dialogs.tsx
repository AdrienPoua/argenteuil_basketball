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
import { Mail, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Form from './Form';
import Match from '@/models/Match';

type DialogsProps = {
  match: ReturnType<Match['toPlainObject']>;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  isDeleting: boolean;
  handleSendConvocation: () => void;
  handleAskConvocation: () => void;
  handleDeleteMatch: () => void;
  onFormSubmitSuccess: () => void;
};

export function Dialogs({
  match,
  isDialogOpen,
  setIsDialogOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  isDeleting,
  handleSendConvocation,
  handleAskConvocation,
  handleDeleteMatch,
  onFormSubmitSuccess,
}: Readonly<DialogsProps>) {
  return (
    <>
      <ConvocationDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={match.isHome ? handleSendConvocation : handleAskConvocation}
        isHomeMatch={match.isHome}
        convocationIsSent={match.convocationIsSent}
        convocationIsAsked={match.convocationIsAsked}
        match={match}
      />

      <EditDialog
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        match={match}
        onSuccess={onFormSubmitSuccess}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteMatch}
        isDeleting={isDeleting}
      />
    </>
  );
}

type ConvocationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isHomeMatch: boolean;
  convocationIsSent: boolean;
  convocationIsAsked: boolean;
  match?: ReturnType<Match['toPlainObject']>;
};

function ConvocationDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  isHomeMatch,
  convocationIsSent,
  convocationIsAsked,
  match,
}: Readonly<ConvocationDialogProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
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

type EditDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  match: ReturnType<Match['toPlainObject']>;
  onSuccess: () => void;
};

function EditDialog({ isOpen, onOpenChange, match, onSuccess }: Readonly<EditDialogProps>) {
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

type DeleteDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
};

function DeleteDialog({ isOpen, onOpenChange, onDelete, isDeleting }: Readonly<DeleteDialogProps>) {
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
