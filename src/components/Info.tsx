import React from "react";
import { Box, Typography } from "@mui/material";

export default function Index({ content }: Readonly<{ content: string }>) {
  return (
    <Box className='flex flex-col items-center bg-red-600 py-24'>
      <Typography className="text-base md:text-3xl text-center"> {content} </Typography>
    </Box>
  );
}
