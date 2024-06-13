"use client";
import Layout from "@/layout/main";
import { Container, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { documents } from "@/build";

const DownloadButton = ({ document }: { document: { id: string; title: string; url: string } }) => (
  <Button
    component="a"
    href={document.url}
    download
    variant="contained"
    startIcon={<CloudUploadIcon />}>
    <Typography className="leading-10 tracking-wider text-xs md:text-base">{document.title}</Typography>
  </Button>
);

export default function DocumentsPage() {
  return (
    <Layout pageTitle="Les documents utiles">
      <Container
        className="flex flex-col gap-5"
        maxWidth="xs">
        {documents.map((document) => (
          <DownloadButton
            key={document.id}
            document={document}
          />
        ))}
      </Container>
    </Layout>
  );
}
