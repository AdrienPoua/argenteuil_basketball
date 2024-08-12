"use client";
import { Box, Container, Typography, Grid } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/fetch";
import { POST_HOME_LEFT_QUERY, POST_HOME_RIGHT_QUERY } from "@/lib/sanity/queries";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme, useMediaQuery } from "@mui/material";
import { useRef, ReactElement } from "react";
import useVisibility from "@/utils/hooks/useVisibility";


const PostCard = dynamic(() => import("@/components/Cards").then((mod) => mod.PostCard), { ssr: false });

const HeroSection = () => {
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
  }
  return (
    <Box component="main" className="flex flex-col grow">
      <Box className="h-svh relative">
        <Box className="absolute h-96 inset-x-0 bottom-0 w-full bg-gradient-to-t marker: from-black from-20%"></Box>
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={animation}
          className="absolute inset-0 flex justify-center items-center"
        >
          <Typography variant="h1" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center">
            Argenteuil Basketball
          </Typography>
        </motion.div>
        <Image
          src={"/images/background.jpg"}
          alt="background"
          className="size-full object-cover "
          width={1920}
          height={1080}
        />
      </Box>
    </Box>
  );
};

const PostsWrapper = () : ReactElement => {
  const { data: leftPostOnHomePage } = useQuery(['home', 'left'], () =>
    sanityFetch<SanityDocument>({ query: POST_HOME_LEFT_QUERY })
  );
  const { data: rightPostOnHomePage } = useQuery(['home', 'right'], () =>
    sanityFetch<SanityDocument>({ query: POST_HOME_RIGHT_QUERY })
  );

  const GridRef = useRef(null);
  const isVisible = useVisibility(GridRef);
  const animation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" }, duration: 0.3 },
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={5}
        ref={GridRef}
        className="mb-10">
        <Grid
          item
          xs={12}
          md={6}>
          {leftPostOnHomePage && (
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              whileHover="hover"
              variants={animation}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <PostCard
                post={leftPostOnHomePage}
                isMobile={isMobile}
                sticky
              />
            </motion.div>
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
            {rightPostOnHomePage && (
              <motion.div
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover="hover"
                variants={animation}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <PostCard
                  post={rightPostOnHomePage}
                  isMobile={isMobile}
                />
              </motion.div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default function HomePage() {
  return (
    <>
      <Header />
      <Box className="bg-black">
        <HeroSection />
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            className="text-white mb-8">
            Actualités{" "}
          </Typography>
        </Container>
        <PostsWrapper />
      </Box>
      <Footer />
    </>
  );
};



