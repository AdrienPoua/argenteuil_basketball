"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import theme from "@/app/theme";
import { ModalProvider } from "@/utils/contexts/Modal";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import App from "./App";
import "./globals.css";
import store from "@/lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <ReduxProvider store={store}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
              <ModalProvider>
                <App>
                  <ScrollToTopButton />
                  {children}
                </App>
              </ModalProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </SessionProvider>
      </ReduxProvider>
    </StyledEngineProvider>
  );
}
