import MainSection from '@/components/layouts/MainSection';
import TeamService from '@/services/Team';
import H2 from '@/components/ui/h2';
import CardsWrapper from './CardsWrapper';
import Team from '@/models/Team';

export const metadata = {
  title: 'Nos équipes | Argenteuil Basketball',
  description: 'Découvrez nos équipes de basket à Argenteuil, des plus jeunes aux séniors.',
  openGraph: {
    title: 'Nos équipes - Argenteuil Basketball',
    description: 'Découvrez nos équipes de basket à Argenteuil, des plus jeunes aux séniors.',
  },
};

export default async function EquipesPage() {
  const teams = await TeamService.getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));
  return (
    <MainSection>
      <H2>Nos équipes 2025-2026</H2>
      <CardsWrapper teams={teams} />
    </MainSection>
  );
}
