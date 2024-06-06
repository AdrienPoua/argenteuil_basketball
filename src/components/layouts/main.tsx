import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

export default function Layout({ pageTitle, children }: Readonly<{ pageTitle: string, children: React.ReactNode }>) {
  return (
    <Container  maxWidth="xl" component="main" className="grow pb-24">
      <Typography variant="h1">
        {pageTitle}
      </Typography>
      <Container maxWidth={false} className="flex flex-col grow">
        {children}
      </Container>
    </Container>
  );
}
