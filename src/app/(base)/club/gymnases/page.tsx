"use client";
import { Box } from "@mui/material";
import { gyms } from "@/utils/services/dataProcessing";
import { Gym } from "@/utils/models";
import H1 from '@/components/H1';
import { MainSection } from "@/utils/layouts";

import dynamic from 'next/dynamic';

// Dynamically import the LeaderCard component
const GymCard = dynamic(() =>
  import('@/components/Cards').then(mod => mod.GymCard),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <H1> Nos gymnases </H1>
      <MainSection>
        <Box className="flex flex-col gap-16">
          {gyms.map((gym: Gym) => (
            <GymCard key={gym.id} data={gym} />
          ))}
        </Box>
      </MainSection>
    </>
  );
}
