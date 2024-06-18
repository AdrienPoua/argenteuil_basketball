"use client";
import { v4 as uuidv4 } from "uuid";
import { News } from "@/models";
import { Container, Grid } from "@mui/material";

import dynamic from 'next/dynamic';

const NewsCard = dynamic(() =>
  import('@/components/Card').then(mod => mod.NewsCard),
  { ssr: false }
);


interface NewsContainerProps {
  news: News[];
}

const NewsContainer = ({ news }: NewsContainerProps) => {
  const mainNews = News.main(news);
  const secondaryNews = News.secondary(news);
  const newsToDisplay = News.lastFour(news);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={5} className="mb-10">
        <Grid item xs={12} md={6}>
          <NewsCard data={mainNews} sticky />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} className="mb-2">
            <NewsCard data={secondaryNews} />
          </Grid>
          <Grid container spacing={1}>
            {newsToDisplay.map((newsItem: News) => (
              <Grid key={uuidv4()} item xs={6}>
                <NewsCard small key={newsItem.id} data={newsItem} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsContainer;
