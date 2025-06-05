'use client';

import Match from '@/models/Match';
import Card from '@/components/ui/InfoMatchCard';
import { useQuery } from 'react-query';
import { getWeeklyHomeMatch } from '@/actions/matchs/getWeeklyHomeMatch';

export default function WeeklyMatch() {
  const queryFn = async () => {
    const matches = await getWeeklyHomeMatch();
    return matches.map((match) => new Match(match)).map((m) => m.toPlainObject());
  };

  const {
    data: weeklyMatchs = [],
    isLoading,
    error,
  } = useQuery('weeklyHomeMatches', queryFn, {
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className='mb-20 flex min-h-96 flex-col items-center justify-center'>
        <div className='container flex flex-col gap-10'>
          <div className='mb-10 rounded-lg border-2 border-primary p-4 text-center'>
            <p className='text-3xl'>Chargement des matchs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='mb-20 flex min-h-96 flex-col items-center justify-center'>
        <div className='container flex flex-col gap-10'>
          <div className='mb-10 rounded-lg border-2 border-primary p-4 text-center'>
            <p className='text-3xl'> Ca bug ! Prevenez le club !</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mb-20 flex min-h-96 flex-col items-center justify-center'>
      <div className='container flex flex-col gap-10'>
        {weeklyMatchs.length > 0 ? (
          weeklyMatchs.map((match) => <Card key={match.id} match={match} />)
        ) : (
          <div className='mb-10 rounded-lg border-2 border-primary p-4 text-center'>
            <p className='text-3xl'>Aucun match cette semaine, reposez vous bien</p>
          </div>
        )}
      </div>
    </div>
  );
}
