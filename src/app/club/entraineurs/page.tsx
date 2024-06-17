"use client";
import Layout from "@/layout/main";
import { LeaderCard } from "@/components/Card";
import { Box } from "@mui/material";
import { leadership } from "@/services/dataProcessing";
import { v4 as uuidv4 } from "uuid";
import { Leadership } from "@/models";
import Info from "@/components/Info";

export default function Index() {
  const coachs = leadership.filter((leader) => leader.isCoach);
  return (
    <Layout pageTitle="Nos entraineurs">
      <Box className="flex flex-wrap gap-10 w-full justify-center items-center">
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
    </Layout>
  );
}
