"use client";
import { Box, Container, Typography } from "@mui/material";
import HeroSection from "@/components/HeroSection";
import Posts from "@/components/NewsContainer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";

const Home = () => {

  return (
    <>
      <Header data={headerData} />
      <Box className="bg-black">
        <HeroSection />
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            className="text-white mb-8">
            Actualités{" "}
          </Typography>
        </Container>
        <Posts />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
