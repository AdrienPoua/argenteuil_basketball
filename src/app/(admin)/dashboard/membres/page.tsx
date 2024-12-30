"use server"
import Card from "./components/Card";
import { MemberService } from '@/database/services/Member';
import { TeamService } from '@/database/services/Team';
import Member from '@/models/Member';
import Team from '@/models/Team';
import Form from "./components/Form";


export default async function Page() {
  const members = await new MemberService().getMembers().then((members) => members.map((member) => new Member(member))).then((members) => members.map((member) => member.toPlainObject()))
  const teams = await new TeamService().getTeams().then((teams) => teams.map((team) => new Team(team))).then((teams) => teams.map((team) => team.toPlainObject()))
  return (
    <>
      <Form teams={teams} />
      {
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
          {members.map((member) => (
            <Card
              key={member.id}
              data={member}
              teams={teams}
            />
          ))}
        </div>
      }
    </>
  );
}

