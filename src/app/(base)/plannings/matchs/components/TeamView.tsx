'use client';

import type Match from '@/models/Match';
import Card from './Card';
import { useMatchs } from '../actions/client.actions';
import { useMatchContext } from '../context';
import NoMatch from './NoMatch';
type PropsType = { matchs: ReturnType<Match['toPlainObject']>[] };

export default function TeamView({ matchs }: Readonly<PropsType>) {
  const { matchsByChampionnat } = useMatchs({ matchs });
  const { currentMonth } = useMatchContext();
  if (currentMonth === 5 || currentMonth === 6 || currentMonth === 7) return <NoMatch />;
  return (
    <div className='flex flex-col gap-8 container mx-auto'>
      {matchsByChampionnat.map((matchs) => {
        if (matchs.length === 0) return null;
        return (
          <div key={matchs[0].championnat} className='space-y-4'>
            <div className='flex flex-col md:flex-row gap-4 '>
              <Item>
                <h3 className='flex size-full items-center justify-center bg-primary'>{matchs[0].championnat}</h3>
              </Item>
              {matchs.map((match) => (
                <Item key={match.id}>
                  <Card match={match} />
                </Item>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Item = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className='size-full md:size-64 md:min-h-64 md:min-w-64 overflow-hidden rounded-lg'>{children}</div>;
};
