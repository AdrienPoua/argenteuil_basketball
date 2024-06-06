"use client";
import React from "react";
import LandingPage from "@/components/LandingPage";
import data from "@/data/news.json";
import { v4 as uuidv4 } from "uuid";
import { NewsType } from "@/types";
import { NewsCard } from "@/components/Card";
import { NewsModel } from "@/models";
import { Box, Typography, Link, Container, Grid } from "@mui/material";

const News = ({ data }: Readonly<{ data: NewsType[] }>) => {
  const newsData = data.map((news) => new NewsModel(news));
  const mainNews = newsData.find((item) => item.type === "main") ?? newsData[0];
  const secondaryNews = newsData.find((item) => item.type === "secondary") ?? newsData[1];
  const othersNews = data.filter((item) => item !== mainNews && item !== secondaryNews);
  const newsToDisplay = NewsModel.sortByDate(othersNews).slice(0, 4);
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={5}
        className="mb-10">
        <Grid
          item
          xs={6}>
          <NewsCard
            data={mainNews}
            sticky
          />
        </Grid>
        <Grid
          item
          xs={6}>
          <Grid
            item
            xs={12}
            className=" mb-2">
            <NewsCard data={secondaryNews} />
          </Grid>
          <Grid
            container
            spacing={1}>
            {newsToDisplay.map((news: NewsType) => (
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

export default function Home() {
  // Sorting by date and taking the top 4
  return (
    <>
      <LandingPage />
      <Container
        maxWidth="xl"
        className="flex justify-between uppercase items-center mb-16">
        <Typography className="text-white text-5xl">Latest News</Typography>
        <Link
          href="/"
          className="relative">
          <Typography className="underline text-2xl me-5 text-white">All news</Typography>
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
      </Container>
      <News data={data} />
    </>
  );
}
