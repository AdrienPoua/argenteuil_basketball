'use server';

import MatchService from '@/services/Match';
import Match from '@/models/Match';
import Card from '@/components/ui/InfoMatchCard';

export default async function WeeklyMatch() {
  const weeklyMatchs = await MatchService.getWeeklyHomeMatch()
    .then((match) => match.map((match) => new Match(match)))
    .then((match) => match.map((m) => m.toPlainObject()));

  return (
    <div className='flex min-h-96 flex-col items-center justify-center mb-20'>
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
