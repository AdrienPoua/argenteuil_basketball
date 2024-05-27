import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Layout({ pageTitle, children }: Readonly<{ pageTitle: string, children: React.ReactNode }>) {
  return (
    <Box component="main" className="flex flex-col align-middle justify-center grow bg-black pb-10">
      <Typography variant="h1" className="text-white text-center text-5xl mt-10 mb-20">
        {pageTitle}
      </Typography>
      <Box className="flex grow justify-center">
        {children}
      </Box>
    </Box>
  );
}
