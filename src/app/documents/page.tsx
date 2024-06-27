"use client";
import Layout from "@/layouts/main";
import { Container } from "@mui/material";
import { documents } from "@/services/dataProcessing";
import {DownloadButton} from "@/components/Buttons";



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
            animation={true}
          />
        ))}
      </Container>
    </Layout>
  );
}
