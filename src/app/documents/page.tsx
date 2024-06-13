"use client";
import Layout from "@/layout/main";
import { Container } from "@mui/material";
import { documents } from "@/build";
import DownloadButton from "@/components/DownloadButton";



export default function DocumentsPage() {
  return (
    <Layout pageTitle="Les documents utiles">
      <Container
        className="flex flex-col gap-5"
        maxWidth="xs">
        {documents.map((document) => (
          <DownloadButton
            key={document.id}
            title={document.title}
            url={document.url}
          />
        ))}
      </Container>
    </Layout>
  );
}
