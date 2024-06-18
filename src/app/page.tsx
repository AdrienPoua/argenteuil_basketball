"use client";
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { validateAllData, news } from "@/services/dataProcessing";
import HeroSection from "@/components/HeroSection";
import NewsContainer from "@/components/NewsContainer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";

const Home = () => {
  useEffect(() => {
    validateAllData()
      .then(() => {
        console.log("All data validated");
      })
      .catch((error) => {
        console.error("Validation error:", error);
      });
  }, []);

  return (
    <>
    <Header data={headerData} />
    <Box className="bg-black">
      <HeroSection />
      <Container maxWidth="xl">
        <Typography variant="h2" className="text-white mb-8">Actualités </Typography>
      </Container>
      <NewsContainer news={news} />
    </Box>
    <Footer />
    </>
  );
};

export default Home;
