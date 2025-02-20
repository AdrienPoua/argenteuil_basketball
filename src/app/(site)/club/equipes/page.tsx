import MainSection from '@/components/layouts/MainSection';
import TeamService from '@/services/Team';
import Team from '@/models/Team';
import VideoTitle from '@/components/ui/video-title';
import CardsWrapper from './CardsWrapper';

export const metadata = {
  title: 'Equipes | Argenteuil Basketball',
  description: "Découvrez les équipes du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Equipes - Argenteuil Basketball',
    description: "Toutes les infos sur les équipes du club de basket d'Argenteuil.",
  },
};

export default async function TeamPage() {
  const teams = await TeamService.getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));
  return (
    <MainSection>
      <VideoTitle type='h1' video='/videos/equipes.mp4'>
        Nos équipes 2024-2025
      </VideoTitle>
      <CardsWrapper teams={teams} />
    </MainSection>
  );
}
