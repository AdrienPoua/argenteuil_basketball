"use client";
import data from "@/data/staff.json";
import { MemberFactory } from "@/factories";
import { Coach } from "@/models";
import { StaffCard } from "@/components/Card";
import { AdherentType, CoachType } from "@/types";
import CardLayout from "@/components/layouts/main";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";


export default function Entraineurs() {
  const coachs: Coach[] = data.map((member) => MemberFactory.create(member, "coach")).filter((member): member is Coach => member instanceof Coach);
  return (
    <CardLayout pageTitle='Nos entraineurs'>
      <Box className='flex flex-wrap gap-5'>
        {" "}
        {coachs.map((coach: Coach) => (
          <StaffCard data={coach} key={uuidv4()} />
        ))}
      </Box>
    </CardLayout>
  );
}
