'use client';

import { Button } from '@/components/ui/button';
import { useActions } from './actions/client.actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarClock } from 'lucide-react';

export default function Page() {
  const { updateClubs, updateMatch, isTransfering } = useActions();

  return (
    <div className='space-y-6'>
      <Alert>
        <CalendarClock className='h-4 w-4' />
        <AlertTitle>Mise à jour automatique</AlertTitle>
        <AlertDescription>
          Les clubs et les matchs sont automatiquement mis à jour chaque lundi à 01h00.
        </AlertDescription>
      </Alert>

      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Mise à jour manuelle</h2>
        <Button
          onClick={() => updateClubs()}
          className='mx-auto my-2 flex w-full max-w-md justify-center'
          disabled={isTransfering}
        >
          Mettre à jour les clubs
        </Button>
        <Button
          onClick={() => updateMatch()}
          className='mx-auto my-2 flex w-full max-w-md justify-center'
          disabled={isTransfering}
        >
          Mettre à jour les matchs
        </Button>
      </div>
    </div>
  );
}
