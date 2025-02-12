import H1 from '@/components/ui/H1';
import Match from '@/models/Match';
import ViewTab from './components/ViewTab';
import MainSection from '@/components/layouts/MainSection';
import MatchService from '@/services/Match';

export const metadata = {
  title: 'Matchs | Argenteuil Basketball',
  description: "Découvrez le calendrier des matchs du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Matchs - Argenteuil Basketball',
    description: "Toutes les infos sur le calendrier des matchs du club de basket d'Argenteuil.",
  },
};

export default async function MatchsPage() {
  const matchs = await MatchService.getMatchs()
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
