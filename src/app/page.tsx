"use client";
import { v4 as uuidv4 } from "uuid";
import { NewsCard } from "@/components/Card";
import { news } from "@/build";
import { News } from "@/models";
import { Box, Typography, Link, Container, Grid } from "@mui/material";
import Image from "next/image";

const NewsContainer = () => {
  const mainNews = News.main(news);
  const secondaryNews = News.secondary(news);
  const newsToDisplay = News.lastFour(news);
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={5}
        className="mb-10">
        <Grid
          item
          xs={12}
          md={6}>
          <NewsCard
            data={mainNews}
            sticky
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <Grid
            item
            xs={12}
            className=" mb-2">
            <NewsCard data={secondaryNews} />
          </Grid>
          <Grid
            container
            spacing={1}>
            {newsToDisplay.map((news: News) => (
              <Grid
                key={uuidv4()}
                item
                xs={6}>
                <NewsCard
                  small
                  key={news.id}
                  data={news}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const HeroSection = () => {
  return (
    <Box
      component="main"
      className="flex flex-col grow">
      <Box className="h-svh relative">
        <Box className="absolute h-96 inset-x-0 bottom-0 w-full bg-gradient-to-t from-black"></Box>
        <Image
          src={"/images/background.jpg"}
          alt="background"
          className="w-full h-full object-cover object-bottom"
          width={1920}
          height={1080}
        />
      </Box>
      <Box className="h-16 w-full bg-black"></Box>
    </Box>
  );
};

export default function Home() {
  // Sorting by date and taking the top 4
  return (
    <Box className="bg-black">
      <HeroSection />
      <Container maxWidth="xl">
        <Typography className="text-white text-5xl mb-8">Actualités </Typography>
      </Container>
      <NewsContainer />
    </Box>
  );
}
