"use client";
import Layout from "@/layout/main";
import { v4 as uuiv4 } from "uuid";
import { Box } from "@mui/material";
import { GymCard } from "@/components/Card";
import { gyms } from "@/build";
import { Gym } from "@/models";

export default function Page() {
  return (
    <Layout pageTitle="Nos gymnases">
      <Box className="flex flex-col gap-16">
        {gyms.map((gym : Gym) => (
          <GymCard key={uuiv4()} data={gym} />
        ))}
      </Box>
    </Layout>
  );
}
