"use client";
import React from "react";
import { NewsType } from "@/types";
import Card from "@/components/Card";
import { NewsModel } from "@/models";
import { Box, Typography } from "@mui/material";

export default function Container({ data }: Readonly<{ data: NewsType[] }>) {
  // Ensuring there is a fallback if the main or secondary news isn't explicitly marked
  const mainNews = data.find((item) => item.type === "main") ?? data[0];
  const secondaryNews =
    data.find((item) => item.type === "secondary") ?? data[1];
  const othersNews = data.filter(
    (item) => item !== mainNews && item !== secondaryNews
  );

  // Sorting by date and taking the top 4
  const newsToDisplay = NewsModel.sortByDate(othersNews).slice(0, 4);

  return (
    <Box className="flex flex-col mb-24">
      <Box className="flex gap-5">
        <Box className="flex flex-col w-1/2">
          <Card data={mainNews} />
        </Box>
        <Box className="flex flex-col w-1/2">
          <Card data={secondaryNews} />
          <Box className="flex flex-wrap mt-5 justify-between">
            {newsToDisplay.map((news : NewsType) => (
              <Card key={news.id} data={news} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
