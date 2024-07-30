"use client";
import React from "react";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <Box className="bg-black py-16 grow ">     
        {children}
      </Box>
      <Footer />
    </>
  );
}
