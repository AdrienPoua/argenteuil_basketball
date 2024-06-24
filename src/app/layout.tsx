"use client";
import "./globals.css";
import App from "./App";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/theme";
import { OverlayProvider } from "@/contexts/Overlay";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <OverlayProvider>
            <App>
              <ScrollToTopButton />
              {children}
            </App>
          </OverlayProvider>
        </ThemeProvider>
      </SessionProvider>
    </StyledEngineProvider>
  );
}
