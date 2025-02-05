'use client';

import TeamView from './TeamView';
import DateView from './DateView';
import Match from '@/models/Match';
import { useMatchContext } from '../context';
type PropsType = { matchs: ReturnType<Match['toPlainObject']>[] };

export default function ViewTab({ matchs }: Readonly<PropsType>) {
  const { currentView } = useMatchContext();
  return <div>{currentView === 'équipe' ? <TeamView matchs={matchs} /> : <DateView matchs={matchs} />}</div>;
}
