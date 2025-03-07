'use client';

import { Button } from '@/components/ui/button';
import updateClubs from '@/actions/fetchs/database/putClubs';
import updateMatchs from '@/actions/fetchs/database/putMatchs';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function Page() {
    const [isTransfering, setIsTransfering] = useState(false);
    const handleUpdateClubs = async () => {
        setIsTransfering(true);
        try {
          await updateClubs();
          toast({
            title: 'Succès',
            description: 'Les clubs ont été mis à jour avec succès',
          });
        } catch (error) {
          console.error('Error updating clubs:', error);
          toast({
            title: 'Erreur',
            description: 'Une erreur est survenue lors de la mise à jour des clubs',
            variant: 'destructive',
          });
        } finally {
          setIsTransfering(false);
        }
      };
      const handleUpdateMatch = async () => {
        setIsTransfering(true);
        try {
          await updateMatchs();
          toast({
            title: 'Succès',
            description: 'Les matchs ont été mis à jour avec succès',
          });
        } catch (error) {
          console.error('Error updating match:', error);
          toast({
            title: 'Erreur',
            description: 'Une erreur est survenue lors de la mise à jour des matchs',
            variant: 'destructive',
          });
        } finally {
          setIsTransfering(false);
        }
      };
  return (
    <div>
      <Button onClick={() => handleUpdateClubs()} className='mx-auto my-10 flex' disabled={isTransfering}>
        {' '}
        Mettre a jour les clubs
      </Button>
      <Button onClick={() => handleUpdateMatch()} className='mx-auto my-10 flex' disabled={isTransfering}>
        {' '}
        Mettre a jour les matchs
      </Button>
    </div>
  );
}
