"use client";
import type { Metadata } from "next";
import "./globals.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const metadata: Metadata = {
  title: "Paris Basketball",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <App> {children} </App>
    </StyledEngineProvider>
  );
}
