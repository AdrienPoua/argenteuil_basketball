"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function Index() {
  const [post, setPost] = useState<SanityDocument>();
  const { slug } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityFetch<SanityDocument>({
        query: POST_QUERY(slug as string),
      });
      if (!data) {
        router.push("/404"); // Rediriger vers la page 404 si le post n'est pas trouvé
      } else {
        setPost(data);
      }
    };
    fetchData();
  }, [slug, router]);
  return (
    <>
      <Header data={headerData} />
      <Container className="flex flex-col grow mb-20">
        <Box className="flex flex-col items-center w-full mb-10">
          {post && (
            <Box className="flex items-center w-full flex-wrap mb-6" >
              <Typography
                variant="h1"
                className="text-black text-center mb-5 grow">
                {post.title}
              </Typography>
              <Typography className="font-secondary text-gray-500 text-right w-full">
                {`Publié le ${Utils.formatDate(new Date(post.publishedAt))}`}
              </Typography>
            </Box>
          )}
        </Box>
        <Container className="flex flex-col gap-5">
          {" "}
          {post && post.body && (
            <PortableText
              value={post.body}
              components={components}
            />
          )}
        </Container>
      </Container>
      <Footer />
    </>
  );
}
