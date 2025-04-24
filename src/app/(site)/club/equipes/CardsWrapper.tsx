'use client';

import Team from '@/models/Team';
import Card from './Card';

type PropsType = {
  teams: ReturnType<Team['toPlainObject']>[];
};

export default function CardsWrapper({ teams }: Readonly<PropsType>) {
  return (
    <div className='mb-20 w-full'>
      <div className='grid auto-rows-max grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {teams
          .toSorted((a, b) => {
            // Trier d'abord par type: compétition ou école de basket
            if (a.isCompetition && !b.isCompetition) return -1;
            if (!a.isCompetition && b.isCompetition) return 1;

            // Ensuite par nom d'équipe
            return a.name.localeCompare(b.name);
          })
          .map((team, index) => (
            <Card key={team.id} data={team} index={index} />
          ))}
      </div>
    </div>
  );
}
