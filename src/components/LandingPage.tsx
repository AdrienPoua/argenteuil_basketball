import React from "react";
import Image from "next/image";
import background from "@/public/background.jpg";
import { Box } from "@mui/material";

export default function LandingPage() {
  return (
    <Box component="main" className="flex flex-col grow">
      <Box className="h-svh relative">
        <Box className="absolute h-96 inset-x-0 bottom-0 w-full bg-gradient-to-t from-black"></Box>
        <Image
          src={background}
          alt="background"
          className="w-full h-full object-cover object-bottom"
          width={1920}
          height={1080}
        />
      </Box>
      <Box className="h-16 w-full bg-black"></Box>
    </Box>
  );
}
