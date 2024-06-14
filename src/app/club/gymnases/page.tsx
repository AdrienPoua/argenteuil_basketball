"use client";
import Layout from "@/layout/main";
import { Box } from "@mui/material";
import { GymCard } from "@/components/Card";
import { gyms } from "@/services/dataProcessing";
import { Gym } from "@/models";

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
