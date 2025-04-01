'use client';
import Card from '../components/Card';
import Match from '@/models/Match';

type PropsType = {
  matchs: ReturnType<Match['toPlainObject']>[];
};

export default function Grid({ matchs }: Readonly<PropsType>) {
  return (
    <div className='flex flex-col gap-4'>
      {matchs.length === 0 ? (
        <NoMatchs />
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {matchs.map((match, index) => (
            <Card key={`${match.matchNumber}-${index}`} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}

const NoMatchs = () => {
  return (
    <div className='flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center'>
      <p className='text-muted-foreground'>Aucun match ne correspond aux critères sélectionnés</p>
    </div>
  );
};
