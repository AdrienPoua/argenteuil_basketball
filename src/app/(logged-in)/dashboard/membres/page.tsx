'use server';

import Card from './components/Card';
import MemberService from '@/services/Member';
import TeamService from '@/services/Team';
import Member from '@/models/Member';
import Team from '@/models/Team';
import { AddMemberModal } from './components/AddMemberModal';

export default async function Page() {
  const members = await MemberService.getMembers()
    .then((members) => members.map((member) => new Member(member)))
    .then((members) => members.map((member) => member.toPlainObject()));
  const teams = await TeamService.getTeams()
    .then((teams) => teams.map((team) => new Team(team)))
    .then((teams) => teams.map((team) => team.toPlainObject()));
  return (
    <>
      <div className='mb-6 flex justify-end'>
        <AddMemberModal teams={teams} />
      </div>

      <div className='grid grid-cols-1 place-items-center items-center justify-center gap-10 p-10 md:grid-cols-3'>
        {members.map((member) => (
          <Card key={member.id} data={member} teams={teams} />
        ))}
      </div>
    </>
  );
}
