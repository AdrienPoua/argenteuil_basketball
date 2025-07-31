import Card from '@/components/parts/hero/match.card';
import { getWeeklyHomeMatchs } from '@/core//presentation/actions/matchs/getWeeklyHomeMatchs';
import { toPersistence } from '@/mappers/match.mapper';

export default async function WeeklyMatch() {
  const matchs = await getWeeklyHomeMatchs().then((matchs) => matchs.map((match) => toPersistence(match)));

  return (
    <div className='mb-20 flex min-h-96 flex-col items-center justify-center'>
      <div className='container flex flex-col gap-10'>
        {matchs.length > 0 ? (
          matchs.map((match) => <Card key={match.id} match={match} />)
        ) : (
          <div className='mb-10 rounded-lg border-2 border-primary p-4 text-center'>
            <p className='text-3xl'>Aucun match cette semaine, reposez vous bien</p>
          </div>
        )}
      </div>
    </div>
  );
}
