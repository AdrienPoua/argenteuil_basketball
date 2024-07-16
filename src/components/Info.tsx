import React from "react";
import { Container, Typography } from "@mui/material";

export default function Index({ content }: Readonly<{ content: string }>) {
  return (
    <Container className='flex flex-col items-center bg-red-600 py-24 w-full'>
      <Typography className="text-base md:text-3xl text-center"> {content} </Typography>
    </Container>
  );
}
