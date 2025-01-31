import H1 from '@/components/H1';
import { getMatchs } from './actions/server.actions';
import MatchTabs from './components/Tabs';
import Match from '@/models/Match';

export const metadata = {
  title: 'Matchs | Argenteuil Basketball',
  description: "Découvrez le calendrier des matchs du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Matchs - Argenteuil Basketball',
    description: "Toutes les infos sur le calendrier des matchs du club de basket d'Argenteuil.",
  },
};

export default async function MatchsPage() {
  const matchs = await getMatchs()
    .then((match) => match.map((match) => new Match(match)))
    .then((match) => match.map((m) => m.toPlainObject()));
  return (
    <div className='container mx-auto p-4'>
      <H1>Calendrier des matchs</H1>
      <MatchTabs matchs={matchs} />
    </div>
  );
}
