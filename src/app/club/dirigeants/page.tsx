"use client";

import Layout from "@/layout/main";
import { Box } from "@mui/material";
import { leadership } from "@/services/dataProcessing";
import { v4 as uuidv4 } from "uuid";
import { Leadership } from "@/models";
import dynamic from 'next/dynamic';

// Dynamically import the LeaderCard component
const LeaderCard = dynamic(() =>
  import('@/components/Card').then(mod => mod.LeaderCard),
  { ssr: false }
);

export default function Index() {
  const leaders = leadership.filter((leader) => leader.isLeader);

  return (
    <Layout pageTitle="Les membres du bureau">
      <Box className="flex flex-wrap gap-10 justify-center items-center">
        {leaders.map((leader: Leadership) => (
          <LeaderCard
            key={uuidv4()}
            data={leader}
          />
        ))}
      </Box>
    </Layout>
  );
}
