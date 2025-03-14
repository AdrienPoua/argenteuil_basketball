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
import { Convocation as AskConvocation } from '@/integrations/react-email/templates/ask-convocation';
import Match from '@/models/Match';

type ConvocationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  match: ReturnType<Match['toPlainObject']>;
};

export function AskConvocationDialog({ isOpen, onOpenChange, onConfirm, match }: Readonly<ConvocationDialogProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={
            match?.convocationIsAsked
              ? 'w-full border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800'
              : 'w-full bg-primary/90 hover:bg-primary'
          }
        >
          <Mail className='mr-2 h-4 w-4' />
          <span>Demander la convocation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Aperçu de la demande de convocation</DialogTitle>
          <DialogDescription>Voici un aperçu exact de l&apos;email qui sera envoyé.</DialogDescription>
        </DialogHeader>

        <Card className='mt-4'>
          <CardContent className='pt-6'>
            <AskConvocation match={match} />
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
              Envoyer la demande
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
