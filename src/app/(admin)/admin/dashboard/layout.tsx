"use client";
import React, { ReactElement } from "react";
import SecurisedPath from "@/lib/nextAuth/SecurisedPath";
import { Box } from '@mui/material';
import Sidebar from './Sidebar';


type PropsType = {
  children: React.ReactNode;
}

export default function Index({ children }: Readonly<PropsType>): ReactElement {
  return (
    <SecurisedPath>
      <Box className="flex min-h-screen" sx={{ cursor: 'auto' }}>
        <Sidebar />
        <Box className="flex-grow bg-background p-10">
          {children}
        </Box>
      </Box>
    </SecurisedPath>
  );
}
