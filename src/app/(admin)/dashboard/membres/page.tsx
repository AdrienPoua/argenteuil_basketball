"use server"
import BaseCard from "./Card";
import { MemberService } from '@/database/services/Member';
import { TeamService } from '@/database/services/Team';
import Member from '@/models/Member';
import Team from '@/models/Team';
import Form from "./Form";


export default async function Page() {
  const members = await new MemberService().getMembers().then((members) => { return members.map((member) => member) })
  const teams = await new TeamService().getTeams()
  return (
    <>
      <Form teams={teams} />
      {/* {
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
          {members.map((member) => (
            <BaseCard
              key={member.id}
              data={member}
              teams={teams}
            />
          ))}
        </div>
      } */}
    </>
  );
}

