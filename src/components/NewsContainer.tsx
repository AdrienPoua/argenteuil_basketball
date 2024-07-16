"use client";
import { Container, Grid } from "@mui/material";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/fetch";
import { useState, useEffect } from "react";
import { POST_HOME_LEFT_QUERY, POST_HOME_RIGHT_QUERY } from "@/lib/sanity/queries";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const NewsCard = dynamic(() => import("@/components/Cards").then((mod) => mod.PostCard), { ssr: false });

const NewsContainer = () => {
  const [homeLeft, setHomeLeft] = useState<SanityDocument>();
  const [homeRight, setHomeRight] = useState<SanityDocument>();
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const homeLeft = await sanityFetch<SanityDocument>({
        query: POST_HOME_LEFT_QUERY,
      });
      const homeRight = await sanityFetch<SanityDocument>({
        query: POST_HOME_RIGHT_QUERY,
      });
        setHomeLeft(homeLeft);
        setHomeRight(homeRight);        
    }
    fetchData();
  }, [router]);

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
          {homeLeft && (
            <NewsCard
              post={homeLeft}
              sticky
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <Grid
            item
            xs={12}
            className="mb-2">
            {homeRight && <NewsCard post={homeRight} />}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsContainer;
