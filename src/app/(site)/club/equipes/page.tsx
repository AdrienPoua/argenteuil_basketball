import MainSection from '@/components/layouts/MainSection';
import TeamService from '@/services/Team';
import H2 from '@/components/ui/h2';
import CardsWrapper from './CardsWrapper';

export const metadata = {
  title: 'Nos équipes | Argenteuil Basketball',
  description: 'Découvrez nos équipes de basket à Argenteuil, des plus jeunes aux séniors.',
  openGraph: {
    title: 'Nos équipes - Argenteuil Basketball',
    description: 'Découvrez nos équipes de basket à Argenteuil, des plus jeunes aux séniors.',
  },
};

export default async function EquipesPage() {
  const teams = await TeamService.getTeams();
  return (
    <MainSection>
      <H2>Nos équipes 2024-2025</H2>
      <CardsWrapper teams={teams} />
    </MainSection>
  );
}
