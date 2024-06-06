"use client";
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import { AdherentClass as FactoryClass, LeaderType, MemberType } from "@/types";
import { Leader } from "@/models";
import CardLayout from "@/components/layouts/main";
import StaffCard from "@/components/Card";
import { Box } from "@mui/material";

export default function Index() {
  const isLeader = (member: FactoryClass | null): member is Leader => {
    return member instanceof Leader;
  };

  const leaders: Leader[] = data?.map((member: MemberType) => MemberFactory.create(member, "leader")).filter(isLeader);

  const president = leaders.find((leader) => leader.role.includes("Président"));
  const tresorier = leaders.find((leader) => leader.role.includes("Trésorier") || leader.role.includes("Trésorière"));
  const secretaire = leaders.find((leader) => leader.role.includes("Secrétaire Général"));
  const correspondant = leaders.find((leader) => leader.role.includes("Correspondant") || leader.role.includes("Correspondante"));

  return (
    <CardLayout pageTitle='Les membres du bureau'>
      <Box className='flex flex-wrap gap-10 justify-center items-center'>
        {president && <StaffCard data={president} />}
        {secretaire && <StaffCard data={secretaire} />}
        {tresorier && <StaffCard data={tresorier} />}
        {correspondant && <StaffCard data={correspondant} />}
      </Box>
    </CardLayout>
  );
}
