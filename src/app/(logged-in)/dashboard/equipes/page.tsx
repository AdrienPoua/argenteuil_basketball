'use server';
import Card from './components/Card';
import MemberService from '@/services/Member';
import TeamService from '@/services/Team';
import Member from '@/models/Member';
import Team from '@/models/Team';
import FormModal from './components/Modal';

export default async function Page() {
  const members = await MemberService.getMembers()
    .then((members) => members.map((member) => new Member(member)))
    .then((members) => members.map((member) => member.toPlainObject()));
  const teams = await TeamService.getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));

  return (
    <div className='flex flex-col gap-10'>
      <FormModal members={members} />
      {
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {teams.map((team) => (
            <Card key={team.id} data={team} members={members} />
          ))}
        </div>
      }
    </div>
  );
}
