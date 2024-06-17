import React from "react";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";
import Header from "@/components/Header";

export default function Layout({ pageTitle, children }: Readonly<{ pageTitle: string; children: React.ReactNode }>) {
  return (
    <>
      <Header data={headerData} />
      <Box className=" bg-black grow">
        <Container
          maxWidth="xl"
          component="main"
          className=" flex flex-col pb-24">
          <Typography
            variant="h1"
            className="bg-[url('/images/background.jpg')] w-full py-5 bg-fixed">
            {pageTitle}
          </Typography>
          <Container
            maxWidth="xl"
            disableGutters
            className="flex flex-col grow">
            {children}
          </Container>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
