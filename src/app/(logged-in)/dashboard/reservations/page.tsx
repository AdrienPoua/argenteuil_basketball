import MatchService from '@/services/Match';
import Match from '@/models/Match';
import Grid from './Grid';

export default async function ReservationPage() {
  const matchs = await MatchService.getUpcomingHomeMatchs().then((matchs) =>
    matchs.map((match) => new Match(match).toPlainObject()),
  );
  return (
    <div className='container mx-auto py-8'>
      <Grid matchs={matchs} />
    </div>
  );
}
