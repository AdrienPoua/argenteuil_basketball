"use client";
import { Box } from "@mui/material";
import { leadership } from "@/utils/services/dataProcessing";
import { v4 as uuidv4 } from "uuid";
import { Leadership } from "@/utils/models";
import Info from "@/components/Info";
import H1 from '@/components/H1';

import dynamic from 'next/dynamic';
import { MainSection } from "@/utils/layouts";

// Dynamically import the LeaderCard component
const LeaderCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.LeaderCard),
  { ssr: false }
);


export default function Index() {
  const coachs = leadership.filter((leader) => leader.isCoach);
  return (
    <>
      <H1> Nos entraineurs </H1>
      <MainSection>
      <Box className="flex flex-wrap gap-10 justify-center items-center">
      {coachs.length > 2 ? (
          coachs.map((coach: Leadership) => (
            <LeaderCard
              key={uuidv4()}
              data={coach}
            />
          ))
        ) : (
          <Info content="Equipe en construction" />
        )}
      </Box>
      </MainSection>
    </>
  );
}
