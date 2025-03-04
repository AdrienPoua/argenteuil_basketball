'use client';

import { Button } from '@/components/ui/button';
import { useActions } from './actions/client.actions';
import { useEffect } from 'react';

export default function Page() {
  const { updateClubs, updateMatch, isTransfering } = useActions();
  useEffect(() => {
    const fetchToken = async () => {
      await fetch('/api/ffbb/token');
    };
    fetchToken();
  }, []);

  return (
    <div>
      <Button onClick={() => updateClubs()} className='mx-auto my-10 flex' disabled={isTransfering}>
        {' '}
        Mettre a jour les clubs
      </Button>
      <Button onClick={() => updateMatch()} className='mx-auto my-10 flex' disabled={isTransfering}>
        {' '}
        Mettre a jour les matchs
      </Button>
    </div>
  );
}
