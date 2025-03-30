import Match from '@/models/Match';
import ViewTab from './components/ViewTab';
import MainSection from '@/components/layouts/MainSection';
import MatchService from '@/services/Match';
import H2 from '@/components/ui/h2';

export const metadata = {
  title: 'Matchs du week-end | Argenteuil Basketball',
  description: "Retrouvez ici tous les matchs à venir du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Matchs à venir - Argenteuil Basketball',
    description: "Retrouvez ici tous les matchs à venir du club de basket d'Argenteuil.",
  },
};

export default async function MatchsPage() {
  const matchs = await MatchService.getMatchs()
    .then((match) => match.map((match) => new Match(match)))
    .then((match) => match.map((m) => m.toPlainObject()))
    .then((match) => match.toSorted((a, b) => a.date.getTime() - b.date.getTime()));
  return (
    <MainSection>
      <H2>Matchs à venir</H2>
      <ViewTab matchs={matchs} />
    </MainSection>
  );
}
