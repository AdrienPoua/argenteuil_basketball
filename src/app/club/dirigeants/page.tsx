"use client"
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import { AdherentType, LeaderType } from "@/types";
import { Leader } from "@/models";
import CardLayout from "@/components/layouts/CardLayout";
import LeaderCard from "@/components/Card";

export default function Index() {
  const isLeader = (member: AdherentType): member is Leader => {
    return member instanceof Leader;
  };
  const leaders: LeaderType[] = data.staff
    .map((member) => MemberFactory.create(member, "leader"))
    .filter(isLeader);

  const president = leaders.find((leader) => leader.role.includes("Président"));
  const vicePresident = leaders.find(
    (leader) =>
      leader.role.includes("Vice-président") ||
      leader.role.includes("Vice-Présidente")
  );
  const tresorier = leaders.find(
    (leader) =>
      leader.role.includes("Trésorier") || leader.role.includes("Trésorière")
  );
  const secretaire = leaders.find((leader) =>
    leader.role.includes("Secrétaire")
  );
  const correspondant = leaders.find(
    (leader) =>
      leader.role.includes("Correspondant") ||
      leader.role.includes("Correspondante")
  );
  console.log(president, vicePresident, tresorier, secretaire, correspondant)
  return (
    <CardLayout pageTitle='Les membres du bureau'>
      <div className='flex flex-col items-center'>
        {president && <LeaderCard data={president} />}
        <div className='flex gap-5'>
          {vicePresident && <LeaderCard data={vicePresident} />}
          {tresorier && <LeaderCard data={tresorier} />}
          {secretaire && <LeaderCard data={secretaire} />}
          {correspondant && <LeaderCard data={correspondant} />}
        </div>
      </div>
    </CardLayout>
  );
}
