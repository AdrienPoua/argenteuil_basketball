import H1 from '@/components/H1';
import { getMatchs } from './actions/server.actions';
import Match from '@/models/Match';
import ViewTab from './components/ViewTab';
import MainSection from '@/components/layouts/MainSection';

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
    .then((match) => match.map((m) => m.toPlainObject()))
    .then((match) => match.toSorted((a, b) => a.date.getTime() - b.date.getTime()));
  return (
    <div className='mx-auto'>
      <H1>Calendrier des matchs</H1>
      <MainSection>
        <ViewTab matchs={matchs} />
      </MainSection>
    </div>
  );
}
