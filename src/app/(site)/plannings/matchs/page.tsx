import Match from '@/models/Match';
import ViewTab from './components/ViewTab';
import MainSection from '@/components/layouts/MainSection';
import MatchService from '@/services/Match';
import VideoTitle from '@/components/ui/video-title';

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
      <MainSection>
        <VideoTitle type='h1' video='/videos/matchs.mp4'>
          Calendrier des matchs
        </VideoTitle>
        <ViewTab matchs={matchs} />
      </MainSection>
    </div>
  );
}
