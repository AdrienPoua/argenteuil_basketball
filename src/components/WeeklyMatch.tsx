'use client';

import Match from '@/models/Match';
import Card from '@/components/ui/InfoMatchCard';
import { useEffect, useState } from 'react';
import { getWeeklyHomeMatch } from '@/actions/matchs/getWeeklyHomeMatch';

export default function WeeklyMatch() {
  const [weeklyMatchs, setWeeklyMatchs] = useState<ReturnType<Match['toPlainObject']>[]>([]);

  useEffect(() => {
    getWeeklyHomeMatch()
      .then((match) => match.map((match) => new Match(match)))
      .then((match) => match.map((m) => m.toPlainObject()))
      .then(setWeeklyMatchs);
  }, []);

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
