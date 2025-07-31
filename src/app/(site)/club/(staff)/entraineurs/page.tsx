import MainSection from '@/components/layouts/MainSection';
import Card from './page.card';
import { readCoachsWithTeams } from '@/core/presentation/actions/members/readCoachsWithTeams';
import { toPersistence } from '@/mappers/member.mapper';
import H2 from '@/components/ui/h2';
import { readMembers } from '@/core/presentation/actions/members/readMembers';

export const metadata = {
  title: 'Entraineurs | Argenteuil Basketball',
  description: "Découvrez les entraineurs du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Entraineurs - Argenteuil Basketball',
    description: "Toutes les infos sur les entraineurs du club de basket d'Argenteuil.",
  },
};

export default async function Index() {
  const coachs = await readCoachsWithTeams();
  return (
    <MainSection>
      <H2>Nos entraineurs</H2>
      <div className='grid grid-cols-1 place-items-center items-center justify-center gap-10 p-10 md:grid-cols-3'>
        {coachs?.map((coach) => <Card key={coach.id} data={coach} />)}
      </div>
    </MainSection>
  );
}
