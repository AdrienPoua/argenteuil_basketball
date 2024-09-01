"use client";
import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Index({ children }: Readonly<{ children: React.ReactNode }>): ReactElement {
  return (
    <>
      <Header />
      <Box className="bg-black py-16 grow cursor-none ">
        {children}
      </Box>
      <Footer />
    </>
  );
}
