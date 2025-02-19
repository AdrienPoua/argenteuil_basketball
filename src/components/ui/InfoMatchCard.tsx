'use client';

import Match from '@/models/Match';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/badge';
export default function InfoMatchCard({
  match,
}: Readonly<{
  match: ReturnType<Match['toPlainObject']>;
}>) {
  const { date, heure, championnat, nomEquipe1, nomEquipe2, salle } = match;

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 p-4',
        'overflow-hidden rounded-lg border border-primary bg-background shadow-md',
        'transition-all duration-200 hover:scale-102 hover:border-foreground hover:bg-primary/5',
        'group cursor-pointer',
      )}
    >
      <div className='w-full rounded-md bg-foreground p-3 text-center text-lg font-medium text-background'>
        {format(new Date(date), 'EEEE d MMMM', { locale: fr })} • {heure}
      </div>
      
      <div className='grid grid-cols-3 px-8'>
        <TeamSquare>{nomEquipe1}</TeamSquare>
        <div className='flex flex-col items-center gap-2 grow'>
          <Badge variant="staffCard" className='font-semibold uppercase tracking-wide text-xl'>{championnat}</Badge>
          <p className='text-xl font-bold '>VS</p>
        </div>
        <TeamSquare>{nomEquipe2}</TeamSquare>
      </div>

      {salle && (
        <div className='mt-2 text-center'>
          <p className='text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors'>
            📍 {salle}
          </p>
        </div>
      )}
    </div>
  );
}

const TeamSquare = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        'flex min-h-24 min-w-24 flex-col items-center justify-center p-4',
        'rounded-lg border-2 border-primary bg-background',
        'transition-all duration-200 group-hover:border-foreground group-hover:bg-primary/5',
        'text-center font-medium',
      )}
    >
      {children}
    </div>
  );
};
