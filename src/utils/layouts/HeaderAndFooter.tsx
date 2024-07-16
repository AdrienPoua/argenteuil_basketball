"use client";
import React from "react";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";
import Header from "@/components/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header data={headerData} />
      <Box className="bg-black py-16 grow ">     
        {children}
      </Box>
      <Footer />
    </>
  );
}
