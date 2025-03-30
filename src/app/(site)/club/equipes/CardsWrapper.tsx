'use client';

import { useState } from 'react';
import Team from '@/models/Team';
import Card from './Card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type PropsType = {
  teams: ReturnType<Team['toPlainObject']>[];
};

export default function CardsWrapper({ teams }: Readonly<PropsType>) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <ScrollArea className='mb-20 w-full'>
      <div className='flex gap-4 pb-4'>
        {teams
          .toSorted((a, b) => b.image.localeCompare(a.image))
          .map((team, index) => (
            <Card
              key={team.id}
              data={team}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
              index={index}
            />
          ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
