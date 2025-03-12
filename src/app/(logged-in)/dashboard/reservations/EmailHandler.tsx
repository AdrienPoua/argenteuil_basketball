'use client';

import { Button } from '@/components/ui/button';
import Match from '@/models/Match';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { sendMatchesEmail } from '../../../../actions/emails/send-reservation';

interface PropsType {
  matchs: ReturnType<Match['toPlainObject']>[];
}

export default function EmailSender({ matchs }: Readonly<PropsType>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);

      // Utiliser la server action à la place de l'API route
      const result = await sendMatchesEmail(matchs);

      if (result.success) {
        toast({
          title: 'Email envoyé avec succès !',
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: `Erreur: ${error instanceof Error ? error.message : 'Une erreur est survenue'}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSendEmail} className='w-full' disabled={isLoading}>
      {isLoading ? 'Envoi en cours...' : 'Envoyer le récapitulatif par email'}
    </Button>
  );
}
