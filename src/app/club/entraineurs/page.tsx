"use client";
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import { Coach } from "@/models";
import { CoachCard } from "@/components/Card";
import { AdherentType } from "@/types";
import CardLayout from "@/components/layouts/main";
import { Box } from "@mui/material";

export default function Entraineurs() {
  const isCoach = (member: AdherentType): member is Coach => {
    return member instanceof Coach;
  };
  const coachs = data.staff
    .map((member) => MemberFactory.create(member, "coach"))
    .filter(isCoach);
  return (
    <CardLayout pageTitle='Nos entraineurs'>
      <Box className="flex flex-wrap gap-5"> {coachs.map((coach) => (
        <CoachCard data={coach} key={coach.name} />
      ))}
      </Box>
    </CardLayout>
  );
}
