"use client";
import { useParams } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import { Utils } from "@/utils/models";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";
import { SanityDocument } from "next-sanity";
import { POST_QUERY } from "@/lib/sanity/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/PortableText";
import { useQuery } from "react-query";


export default function Index() {
  const { slug } = useParams();
  const { data } = useQuery(['post', slug], () => sanityFetch<SanityDocument>({ query: POST_QUERY(slug as string) }));
  return (
    <>
      <Header data={headerData} />
      <Container className="flex flex-col grow mb-20">
        <Box className="flex flex-col items-center w-full mb-10">
          {data && (
            <Box className="flex items-center w-full flex-wrap mb-6" >
              <Typography
                variant="h1"
                className="text-black text-center mb-5 grow">
                {data.title}
              </Typography>
              <Typography className="font-secondary text-gray-500 text-right w-full">
                {`Publié le ${Utils.formatDate(new Date(data.publishedAt))}`}
              </Typography>
            </Box>
          )}
        </Box>
        <Container className="flex flex-col gap-5">
          {data && data.body && (
            <PortableText
              value={data.body}
              components={components}
            />
          )}
        </Container>
      </Container>
      <Footer />
    </>
  );
}
