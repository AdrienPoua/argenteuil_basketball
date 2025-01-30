'use server';
import Card from './components/Card';
import { MemberService } from '@/database/services/Member';
import { TeamService } from '@/database/services/Team';
import Member from '@/models/Member';
import Team from '@/models/Team';
import Form from './components/Form';

export default async function Page() {
  const members = await new MemberService()
    .getMembers()
    .then((members) => members.map((member) => new Member(member)))
    .then((members) => members.map((member) => member.toPlainObject()));
  const teams = await new TeamService()
    .getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));

  return (
    <div className='flex flex-wrap gap-10'>
      <Form members={members} />
      {
        <div className='flex flex-wrap gap-10'>
          {teams.map((team) => (
            <Card key={team.id} data={team} members={members} />
          ))}
        </div>
      }
    </div>
  );
}
