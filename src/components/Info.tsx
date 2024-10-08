import React, { ReactElement } from "react";
import { Container, Typography } from "@mui/material";

type PropsType = {
  content: string;
};

export default function Index({ content }: Readonly<PropsType>): ReactElement {
  return (
    <Container className='flex flex-col items-center bg-red-600 py-24 w-full'>
      <Typography className="text-base md:text-3xl text-center"> {content} </Typography>
    </Container>
  );
}
