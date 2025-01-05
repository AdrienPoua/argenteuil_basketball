import { getMatchs } from './actions/server.action';
import Match from '@/models/Match';
import Pannel from './layouts/Pannel';

export default async function Index() {
  const matchs = await getMatchs().then((matchs) => matchs.map((match) => new Match(match).toPlainObject()));
  return (
    <div className="size-full relative">
      <Pannel matchs={matchs} />
    </div>
  )
}

