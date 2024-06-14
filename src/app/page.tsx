"use client";
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { validateAllData, news } from "@/services/dataProcessing";
import HeroSection from "@/components/HeroSection";
import NewsContainer from "@/components/NewsContainer";

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
    <Box className="bg-black">
      <HeroSection />
      <Container maxWidth="xl">
        <Typography className="text-white text-5xl mb-8">Actualités </Typography>
      </Container>
      <NewsContainer news={news} />
    </Box>
  );
};

export default Home;
