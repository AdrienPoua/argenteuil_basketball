"use client";
import Layout from "@/layout/main";
import { LeaderCard } from "@/components/Card";
import { Box } from "@mui/material";
import { leadership } from "@/app/class";
import { v4 as uuidv4 } from "uuid";
import { Leadership } from "@/models";

export default function Index() {
  const leaders = leadership.filter((leader) => leader.isLeader);
  return (
    <Layout pageTitle="Les membres du bureau">
      <Box className="flex flex-wrap gap-10 justify-center items-center">
        {leaders.map((leader : Leadership ) => (
          <LeaderCard
            key={uuidv4()}
            data={leader}
          />
        ))}
      </Box>
    </Layout>
  );
}
