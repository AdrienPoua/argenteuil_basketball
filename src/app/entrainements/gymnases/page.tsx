import React from "react";
import Layout from "@/components/layouts/main";
import { GymType } from "@/types";
import club from "@/data/club.json";
import { Gym } from "@/models";
import { v4 as uuiv4 } from "uuid";
import Image from "next/image";
import { Box, Typography, Link } from "@mui/material";

type GymCardProps = {
  gym: GymType;
};
const GymCard = ({ gym }: GymCardProps) => {
  return (
    <Box className="flex flex-col bg-white rounded-lg shadow-md p-4 m-4 h-fit">
      <Typography variant="h2" className="text-2xl font-bold mb-2 text-center">
        {gym.name}
      </Typography>
      <Image
        src={gym.img ?? `https://via.placeholder.com/150?text=${gym.name}`}
        alt={gym.name}
        className="rounded-lg"
        width={1000}
        height={1000}
      />
      <Link href={gym.maps ?? "https://maps.app.goo.gl/MnXPm14gu3hb3xvu9"} target="_blank" rel="noopener noreferrer">
        <Typography className="text-gray-600 text-center mt-5 cursor-pointer hover:underline">
          {gym.address}
        </Typography>
      </Link>
      <Box className="mt-4"></Box>
    </Box>
  );
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
