"use client";
import React from "react";
import { NewsType } from "@/types";
import { NewsCard } from "@/components/Card";
import { NewsModel } from "@/models";
import { Box, Typography, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function Container({ data }: Readonly<{ data: NewsType[] }>) {
  // Ensuring there is a fallback if the main or secondary news isn't explicitly marked
  const mainNews = data.find((item) => item.type === "main") ?? data[0];
  const secondaryNews = data.find((item) => item.type === "secondary") ?? data[1];
  const othersNews = data.filter((item) => item !== mainNews && item !== secondaryNews);

  // Sorting by date and taking the top 4
  const newsToDisplay = NewsModel.sortByDate(othersNews).slice(0, 4);

  return (
    <Grid container spacing={5} className="mb-10">
      <Grid item xs={6} >
        <NewsCard data={mainNews} sticky />
      </Grid>
      <Grid item xs={6} >
        <Grid item xs={12} className=" mb-2">
          <NewsCard data={secondaryNews} />
        </Grid>
        <Grid container spacing={1}>
          {newsToDisplay.map((news: NewsType) => (
            <Grid key={uuidv4()} item xs={6} >
              <NewsCard small key={news.id} data={news} />
            </Grid>
          ))}
      </Grid>
      </Grid>
    </Grid>
  );
}
