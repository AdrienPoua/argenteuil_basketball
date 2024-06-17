"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Box component="main" className="flex flex-col grow">
      <Box className="h-svh relative">
        <Box className="absolute h-96 inset-x-0 bottom-0 w-full bg-gradient-to-t marker: from-black from-20%"></Box>
        <Typography component="h1" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary text-4xl md:text-6xl font-bold text-center p-4">
         Argenteuil Basketball
         </Typography>
        <Image
          src={"/images/background.jpg"}
          alt="background"
          className="size-full object-cover "
          width={1920}
          height={1080}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
