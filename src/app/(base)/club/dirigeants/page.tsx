"use client";
import { Box } from "@mui/material";
import { leadership } from "@/utils/services/dataProcessing";
import { v4 as uuidv4 } from "uuid";
import { Leadership } from "@/utils/models";
import dynamic from 'next/dynamic';
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";

// Dynamically import the LeaderCard component
const LeaderCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.LeaderCard),
  { ssr: false }
);

export default function Index() {
  const leaders = leadership.filter((leader) => leader.isLeader);
  return (
    <>
      <H1> Les membres du bureau </H1>
      <MainSection>
        <Box className="flex flex-wrap gap-10 justify-center items-center">
          {leaders.map((leader: Leadership) => (
            <LeaderCard
              key={uuidv4()}
              data={leader}
            />
          ))}
        </Box>
      </MainSection>
    </>
  );
}
