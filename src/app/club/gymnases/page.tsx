"use client";
import Layout from "@/layouts/main";
import { Box } from "@mui/material";
import { gyms } from "@/services/dataProcessing";
import { Gym } from "@/models";

import dynamic from 'next/dynamic';

// Dynamically import the LeaderCard component
const GymCard = dynamic(() =>
  import('@/components/Card').then(mod => mod.GymCard),
  { ssr: false }
);

export default function Page() {
  return (
    <Layout pageTitle="Nos gymnases">
      <Box className="flex flex-col gap-16">
        {gyms.map((gym : Gym) => (
          <GymCard key={gym.id} data={gym} />
        ))}
      </Box>
    </Layout>
  );
}
