import H1 from '@/components/H1';
import MainSection from "@/components/layouts/MainSection";
import Card from "../StaffCard";
import { MemberService } from '@/database/services/Member';
import Member from '@/models/Member';

export default async function Index() {
  const leaders = await new MemberService().getLeaders().then((leader) => leader.map((l) => new Member(l).toPlainObject()));
  return (
    <>
      <H1> Nos dirigeants </H1>
      <MainSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
          {leaders.map((leader) => (
            <Card
              key={leader.id}
              data={leader}
            />
          ))}
        </div>
      </MainSection>
    </>
  );
}
