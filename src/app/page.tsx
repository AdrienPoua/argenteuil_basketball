"use client";
import { Box, Container, Typography, Grid } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactElement } from "react";
import useIsMobile from "@/utils/hooks/useIsMobile";
import { useSanity } from "@/utils/hooks/sanity/useSanity";
import { SanityDocument } from "next-sanity";
import { MAX_POSTS_ON_HOME_PAGE } from "@/utils/magicNumber";
import LottieCursor from "@/components/LottieCursor";
import { useRef } from "react";
const PostCard = dynamic(() => import("@/components/Cards").then((mod) => mod.PostCard), { ssr: false });


export default function HomePage() {

  return (
    <>
      <Header />
      <Box className="bg-black" >

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

const HeroSection = () => {
  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
  }
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box component="main" className="flex flex-col grow" >
      <LottieCursor containerRef={ref} />
      <Box className="h-svh relative cursor-none " ref={ref}
      >
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

const AnimatedCard = ({ post, isMobile, small, className }: { post: SanityDocument, isMobile: boolean, small?: boolean, className?: string }): ReactElement => {
  const animation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" }, duration: 0.3 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animation}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <PostCard post={post} isMobile={isMobile} small={small} />
    </motion.div>
  );
};

const PostsWrapper = (): ReactElement => {
  const { leftPostOnHomePage, rightPostOnHomePage, postsOnHomePage } = useSanity()

  const isMobile = useIsMobile();
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
          {leftPostOnHomePage && (
            <AnimatedCard post={leftPostOnHomePage} isMobile={isMobile} className="sticky top-10" />
          )}
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
        >
          <Grid
            item
            xs={12}
          >
            {rightPostOnHomePage && (
              <AnimatedCard post={rightPostOnHomePage} isMobile={isMobile} className="mb-3" />
            )}
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
          >
            {
              postsOnHomePage?.map((post: SanityDocument, index: number) => (
                index < MAX_POSTS_ON_HOME_PAGE && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={post._id}
                  >
                    <AnimatedCard post={post} isMobile={isMobile} small />
                  </Grid>
                )
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
