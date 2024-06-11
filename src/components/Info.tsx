import React from "react";
import { Box, Typography } from "@mui/material";

export default function Index({ content }: { content: string }) {
  return (
    <Box className='flex flex-col items-center bg-red-600 py-24'>
      <Typography className="text-4xl"> {content} </Typography>
    </Box>
  );
}