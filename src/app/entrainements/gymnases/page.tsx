import React from "react";
import Layout from "@/layout/main";
import { GymType } from "@/types";
import club from "@/data/club.json";
import { Gym } from "@/models";
import { v4 as uuiv4 } from "uuid";
import Image from "next/image";
import { Box, Typography, Link } from "@mui/material";

type GymCardProps = {
  gym: GymType;
};

export default function Page() {
  const gymnases = club.gymnases.map((gym) => new Gym(gym));

  return (
    <Layout pageTitle="Nos gymnases">
      <Box className="flex justify-center">
        {gymnases.map((gym) => (
          <GymCard key={uuiv4()} gym={gym} />
        ))}
      </Box>
    </Layout>
  );
}
