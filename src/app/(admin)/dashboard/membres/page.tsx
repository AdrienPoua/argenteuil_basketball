"use server"
import { BaseForm } from './Form';
import CustomCard from "./Card";
import { LeaderService } from '@/database/services/Leader';
import { CoachService } from '@/database/services/Coach';
import Leader from '@/models/Leader';
import Coach from '@/models/Coach';


export default async function Page() {
  const leaderService = new LeaderService();
  const coachService = new CoachService();

  const [leaders, coaches] = await Promise.all([
    leaderService.getLeaders().then((leaders) => leaders.map((leader) => new Leader(leader))),
    coachService.getCoachs().then((coaches) => coaches.map((coach) => new Coach(coach))),
  ]);

  return (
    <>
      <BaseForm />
      {
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center place-items-center p-10">
          {[...leaders, ...coaches].map((member) => (
            <CustomCard
              key={member.id}
              data={member}
            />
          ))}
        </div>
      }
    </>
  );
}

