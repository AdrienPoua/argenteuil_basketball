import H1 from '@/components/H1';
import MainSection from '@/components/layouts/MainSection';
import Card from '../StaffCard';
import { MemberService } from '@/database/services/Member';
import Member from '@/models/Member';

export default async function Index() {
  const coachs = await new MemberService().getCoachs().then((coach) => coach.map((c) => new Member(c).toPlainObject()));
  return (
    <>
      <H1> Nos entraineurs </H1>
      <MainSection>
        <div className='grid grid-cols-1 place-items-center items-center justify-center gap-10 p-10 md:grid-cols-2'>
          {coachs?.map((coach) => <Card key={coach.id} data={coach} />)}
        </div>
      </MainSection>
    </>
  );
}
