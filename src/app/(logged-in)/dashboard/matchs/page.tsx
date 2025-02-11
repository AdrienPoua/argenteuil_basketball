import { getMatchs } from './actions/server.actions';
import Match from '@/models/Match';
import Grid from './layouts/grid';

export default async function Page() {
  const matchs = await getMatchs().then((matchs) => matchs.map((match) => new Match(match).toPlainObject()));
  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold'>Dashboard des matchs</h1>
      <Grid matchs={matchs} />
    </div>
  );
}
