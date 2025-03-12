import Match from '@/models/Match';
import Grid from './layouts/grid';
import MatchService from '@/services/Match';

export default async function Page() {
  const matchs = await MatchService.getMatchs().then((matchs) =>
    matchs.map((match) => new Match(match).toPlainObject()),
  );
  return (
    <div>
      <Grid matchs={matchs} />
    </div>
  );
}
