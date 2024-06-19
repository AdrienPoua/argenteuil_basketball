"use client";
import React, { useEffect } from "react";
import { news } from "@/services/dataProcessing";
import { usePathname, useRouter } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import { News, Utils } from "@/models";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";

export default function Index() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const router = useRouter();
  const data = news.find((newsItem: News) => newsItem.id.toString() === id);
  useEffect(() => {
    if (!data) {
      router.push("/404");
    }
  }, [data, router]);

  if (!data) {
    return null;
  }

  const formatedDate = Utils.formatDate(data.date).toLocaleLowerCase();

  return ( 
    <>
    <Header data={headerData} />
    <Container className="flex flex-col grow mb-10">
      <Box className="flex items-center flex-wrap ">
        <Typography
          variant="h1"
          className="text-black flex items-center">
          {data.title}
        </Typography>
        <Typography className="font-secondary text-gray-500 text-center ms-auto mb-10">{`Publié le ${formatedDate}`}</Typography>
      </Box>
      <Container className="flex flex-col justify-center items-center gap-5">
        {data.content.map((content) => (
          <Typography
            className="text-black font-secondary w-full grow"
            key={uuidv4()}>
            {content}
          </Typography>
        ))}
      </Container>
    </Container>
    <Footer />
    </>
  );
}
