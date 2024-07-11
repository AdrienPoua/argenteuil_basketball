"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { blurInAnimation } from "@/animations";

export default function Layout({ pageTitle, children }: Readonly<{ pageTitle: string; children: React.ReactNode }>) {
  return (
    <>
      <Header data={headerData} />
      <Box className=" bg-black grow">
        <Container
          maxWidth="xl"
          component="main"
          className=" flex flex-col pb-24">
          <Box
            className="bg-[url('/images/background.jpg')] my-10 bg-fixed h-fit-content mb-20"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              variants={blurInAnimation}
              className="text-center"
            >
              <Typography
                variant="h1"
              >
                {pageTitle}
              </Typography>
            </motion.div>
          </Box>
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
