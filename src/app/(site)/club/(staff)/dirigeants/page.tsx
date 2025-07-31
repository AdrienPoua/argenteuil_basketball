import MainSection from '@/components/layouts/MainSection';
import { readMembers } from '@/core/presentation/actions/members/read';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import H2 from '@/components/ui/h2';
import { toPersistence } from '@/mappers/member.mapper';

export const metadata = {
  title: 'Dirigeants | Argenteuil Basketball',
  description: "Découvrez les dirigeants du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Dirigeants - Argenteuil Basketball',
    description: "Toutes les infos sur les dirigeants du club de basket d'Argenteuil.",
  },
};

export default async function Index() {
  const members = await readMembers().then((members) => members.map((member) => toPersistence(member)));
  return (
    <MainSection>
      <H2>Nos dirigeants</H2>
      <AnimatedTestimonials data={members} />
    </MainSection>
  );
}
