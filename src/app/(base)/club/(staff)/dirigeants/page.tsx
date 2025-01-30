import H1 from '@/components/H1';
import MainSection from '@/components/layouts/MainSection';
import Card from '../StaffCard';
import { MemberService } from '@/database/services/Member';
import Member from '@/models/Member';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

export default async function Index() {
  const leaders = await new MemberService()
    .getLeaders()
    .then((leader) => leader.map((l) => new Member(l).toPlainObject()));
  return (
    <>
      <H1> Nos dirigeants </H1>
      <MainSection>
        <AnimatedTestimonials testimonials={leaders} />
      </MainSection>
    </>
  );
}
