"use client";
import Layout from "@/layout/main";
import { Container, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import docs from "@/data/documents.json";
import { v4 as uuidv4 } from "uuid";

const Download = ({ data }: { data: { title: string; url: string } }) => {
  return (
    <Button
      component="a"
      href={data.url}
      download
      variant="contained"
      startIcon={<CloudUploadIcon />}>
      <Typography className="leading-10 tracking-wider text-xs md:text-base "> {data.title} </Typography>
    </Button>
  );
};
export default function Index() {
  return (
    <Layout pageTitle="Les documents utiles">
      <Container
        className="flex flex-col gap-5"
        maxWidth="xs">
        {docs.map((doc) => (
          <Download
            key={uuidv4()}
            data={doc}
          />
        ))}
      </Container>
    </Layout>
  );
}
