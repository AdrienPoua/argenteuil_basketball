"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import theme from "@/app/theme";
import { OverlayProvider } from "@/utils/contexts/Overlay";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import App from "./App";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <OverlayProvider>
              <App>
                <ScrollToTopButton />
                {children}
              </App>
            </OverlayProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </StyledEngineProvider>
  );
}
