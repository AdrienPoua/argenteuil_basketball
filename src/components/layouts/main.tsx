import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

export default function Layout({ pageTitle, children }: Readonly<{ pageTitle: string, children: React.ReactNode }>) {
  return (
    <Container  maxWidth="xl" component="main" disableGutters className="grow pb-10">
      <Typography variant="h1">
        {pageTitle}
      </Typography>
      <Container  disableGutters className="flex grow self-center overflow-hidden ">
        {children}
      </Container>
    </Container>
  );
}
