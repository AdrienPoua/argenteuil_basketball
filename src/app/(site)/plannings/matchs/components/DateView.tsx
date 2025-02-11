'use client';

import type Match from '@/models/Match';
import { useMatchs } from '../actions/client.actions';
import { Home, Plane } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import NoMatch from './NoMatch';
import { useMatchContext } from '../context';

export default function DateView({ matchs }: Readonly<{ matchs: ReturnType<Match['toPlainObject']>[] }>) {
  const { matchsByMonth } = useMatchs({ matchs });
  const { currentMonth } = useMatchContext();
  if (currentMonth === 5 || currentMonth === 6 || currentMonth === 7) return <NoMatch />;
  return (
    <div className='space-y-4 p-4'>
      {matchsByMonth.map((match) => (
        <Card key={match.id} match={match} />
      ))}
    </div>
  );
}

const Card = ({
  match,
}: Readonly<{
  match: ReturnType<Match['toPlainObject']>;
}>) => {
  const { date, heure, championnat, nomEquipe1, nomEquipe2, isHome, salle } = match;

  return (
    <div className='group cursor-pointer overflow-hidden rounded-lg border border-primary bg-background shadow-md transition-all duration-200 hover:scale-105 hover:border-foreground hover:bg-primary hover:shadow-lg'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center space-x-4'>
          {isHome ? <Home className='text-blue-500' size={24} /> : <Plane className='text-green-500' size={24} />}
          <div>
            <p className='text-lg'>{format(new Date(date), 'EEEE d MMMM', { locale: fr })}</p>
            <p className='text-muted-foreground group-hover:text-foreground'>{heure}</p>
          </div>
        </div>
        <div className='text-right'>
          <p className=''>
            {nomEquipe1} vs {nomEquipe2}
          </p>
          <p className='text-sm text-muted-foreground group-hover:text-foreground'>{salle}</p>
          <p className='text-sm text-muted-foreground group-hover:text-foreground'>{championnat}</p>
        </div>
      </div>
    </div>
  );
};
