import MainSection from '@/components/layouts/MainSection';
import MemberService from '@/services/Member';
import Member from '@/models/Member';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import VideoTitle from '@/components/ui/video-title';

export const metadata = {
  title: 'Dirigeants | Argenteuil Basketball',
  description: "Découvrez les dirigeants du club de basket d'Argenteuil.",
  openGraph: {
    title: 'Dirigeants - Argenteuil Basketball',
    description: "Toutes les infos sur les dirigeants du club de basket d'Argenteuil.",
  },
};

export default async function Index() {
  const leaders = await MemberService.getLeaders().then((leader) => leader.map((l) => new Member(l).toPlainObject()));
  return (
      <MainSection>
      <VideoTitle type='h1' video='/videos/dirigeants.mp4'>
        Nos dirigeants
      </VideoTitle>
        <AnimatedTestimonials testimonials={leaders} />
      </MainSection>
  );
}
