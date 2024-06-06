"use client";
import React from "react";
import LandingPage from "@/components/LandingPage";
import News from "@/components/News";
import data from "@/data/news.json";
import { NewsModel } from "@/models";
import { Box, Typography, Link, Container } from "@mui/material";

export default function Home() {
  const newsData = data.map((news) => new NewsModel(news));
  return (
    <>
      <LandingPage />
      <Container maxWidth='xl'>
        <Box className='flex justify-between uppercase items-center mb-16'>
          <Typography className='text-white text-5xl'>Latest News</Typography>
          <Link href='/' className='relative'>
            <Typography className='underline text-2xl me-5 text-white'>All news</Typography>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "100%",
                transform: "translate(-50%, -50%) rotate(-90deg)",
                content: '""',
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid #fff",
              }}
            />
          </Link>
        </Box>
      </Container>
      <Container maxWidth='xl'>
        <News data={newsData} />
      </Container>
    </>
  );
}
