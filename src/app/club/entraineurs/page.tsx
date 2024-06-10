"use client";
import Layout from "@/layout/main";
import { LeaderCard } from "@/components/Card";
import { Box } from "@mui/material";
import { leadership } from "@/class";
import { v4 as uuidv4 } from "uuid";
import { Leadership } from "@/models";

export default function Index() {
  const coachs = leadership.filter((leader) => leader.isCoach);
  return (
    <Layout pageTitle="Nos entraineurs">
      <Box className="flex flex-wrap gap-10 justify-center items-center">
        {coachs.map((coach : Leadership ) => (
          <LeaderCard
            key={uuidv4()}
            data={coach}
          />
        ))}
      </Box>
    </Layout>
  );
}
