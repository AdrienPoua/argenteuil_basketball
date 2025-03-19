'use client';

import type Match from '@/models/Match';
import Card, { SkeletonCard } from './Card';
import { useMatchs } from '../actions/client.actions';
import { useMatchContext } from '../context';
import NoMatch from './NoMatch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
type PropsType = { matchs: ReturnType<Match['toPlainObject']>[] };

export default function TeamView({ matchs }: Readonly<PropsType>) {
  const { matchsByChampionnat } = useMatchs({ matchs });
  const { currentMonth } = useMatchContext();
  const monthsNotDisplayed = [5, 6, 7];
  if (monthsNotDisplayed.includes(currentMonth)) return <NoMatch />;
  return (
    <div className='container mx-auto flex flex-col gap-8'>
      {matchsByChampionnat.map((matchs) => {
        if (matchs.length === 0) return null;
        return (
          <div key={matchs[0].championnat} className='space-y-4'>
            <h3 className='flex w-fit items-center rounded-lg bg-primary p-3 text-white'>{matchs[0].championnat}</h3>
            <ScrollArea className='w-full'>
              <div className='flex space-x-4 pb-4'>
                {matchs.map((match) => (
                  <Suspense fallback={<SkeletonCard />} key={match.id}>
                    <Item key={match.id}>
                      <Card match={match} />
                    </Item>
                  </Suspense>
                ))}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}

const Item = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='size-full flex-shrink-0 overflow-hidden rounded-lg md:size-72 md:min-h-64 md:min-w-64'>
      {children}
    </div>
  );
};
