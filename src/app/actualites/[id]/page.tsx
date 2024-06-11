"use client";
import React from "react";
import { news } from "@/build";
import Layout from "@/layout/main";
import { usePathname } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import { News } from "@/models";
import { v4 as uuidv4 } from "uuid";

export default function Index() {
  const id = usePathname().split("/")[2];
  const formatedDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

    const val = news.find((news: News) => news.id.toString() == id);
    console.log(val)
  console.log(id);
  if (!val) {
    return <Layout pageTitle="404">404</Layout>;
  }
  return (
    <Container className="flex flex-col grow">
      <Box className="flex items-center justify-between">
      <Typography variant="h1" className="text-black flex items-center ">{val.title}</Typography>
      <Typography className="font-secondary text-gray-500 flex items-center mb-7 "> {`Publié le ${formatedDate(val.date)} `} </Typography>
      </Box>
      <Container className="flex flex-col justify-center items-center gap-5">
        {val.content.map((content) => (
          <Typography className="text-black font-secondary w-full grow" key={uuidv4()}>{content}</Typography>
        ))}
      </Container>
    </Container>
  );
}
