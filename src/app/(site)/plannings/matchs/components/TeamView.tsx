'use client';

import type Match from '@/models/Match';
import Card, { SkeletonCard } from './Card';
import { useMatchs } from '../actions/client.actions';
import { useMatchContext } from '../context';
import NoMatch from './NoMatch';
import { ClientOnly } from '@/components/utils/ClientOnly';
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
            <div className='flex flex-col gap-4 md:flex-row'>
              <Item>
                <h3 className='flex size-full items-center justify-center bg-primary'>{matchs[0].championnat}</h3>
              </Item>
              {matchs.map((match) => (
                <ClientOnly fallback={<SkeletonCard />} key={match.id}>
                  <Item key={match.id}>
                    <Card match={match} />
                  </Item>
                </ClientOnly>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Item = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className='size-full overflow-hidden rounded-lg md:size-64 md:min-h-64 md:min-w-64'>{children}</div>;
};
