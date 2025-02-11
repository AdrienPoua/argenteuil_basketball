import H1 from '@/components/H1';
import MainSection from '@/components/layouts/MainSection';
import Card from './Card';
import TeamService from '@/services/Team';
import Team from '@/models/Team';

export const metadata = {
  title: 'Equipes | Argenteuil Basketball',
  description: "Découvrez les équipes du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Equipes - Argenteuil Basketball',
    description: "Toutes les infos sur les équipes du club de basket d'Argenteuil.",
  },
};

export default async function TeamPage() {
  const teams = await TeamService
    .getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));
  return (
    <>
      <H1>Nos équipes 2024-2025</H1>
      <MainSection>
        <div className='mb-20 flex flex-col items-center gap-8'>
          {teams
            .toSorted((a, b) => b.image.localeCompare(a.image))
            .map((team) => (
              <Card key={team.id} data={team} />
            ))}
        </div>
      </MainSection>
    </>
  );
}
