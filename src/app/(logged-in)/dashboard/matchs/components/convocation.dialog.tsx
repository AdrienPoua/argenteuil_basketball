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
import { Card, CardContent } from '@/components/ui/card';
import { Convocation } from '@/integrations/react-email/templates/Convocation';
import Match from '@/models/Match';

type ConvocationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  match: ReturnType<Match['toPlainObject']>;
};

export function ConvocationDialog({ isOpen, onOpenChange, onConfirm, match }: Readonly<ConvocationDialogProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='w-full bg-primary/90 text-foreground hover:bg-primary'>
          <Mail className='mr-2 h-4 w-4' />
          <span className='text-sm'>Envoyer la convocation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Aperçu de la convocation</DialogTitle>
          <DialogDescription>Voici un aperçu exact de l&apos;email qui sera envoyé.</DialogDescription>
        </DialogHeader>

        <Card className='mt-4'>
          <CardContent className='max pt-6'>
            <Convocation match={match} />
          </CardContent>
        </Card>

        <DialogFooter className='mt-4 flex flex-col gap-2 sm:flex-row'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          {match?.convocationIsAsked ? (
            <Badge variant='outline' className='border-blue-300 bg-blue-100 text-blue-800'>
              Demande déjà envoyée
            </Badge>
          ) : (
            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              {match?.convocationIsSent ? 'Confirmer le renvoi' : 'Envoyer la convocation'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
