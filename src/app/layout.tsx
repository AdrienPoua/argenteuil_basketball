"use client";
import type { Metadata } from "next";
import "./globals.css";
import App from "./App";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/theme";
import { OverlayProvider } from "@/contexts/Overlay";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const metadata: Metadata = {
  title: "Argenteuil basketball",
  description: "Site officiel du club de basket d'Argenteuil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OverlayProvider>
          <App>
            <ScrollToTopButton />
            {children}
            </App>
        </OverlayProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
