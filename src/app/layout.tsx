"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import theme from "@/app/theme";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import App from "./App";
import "./globals.css";
import store from "@/lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import Modal from "@/components/Modal";
import { AlertProvider } from "@utils/contexts/Alerts";
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
              <App>
                <AlertProvider >
                  <ScrollToTopButton />
                  <Modal />
                  {children}
                </AlertProvider>
              </App>
            </QueryClientProvider>
          </ThemeProvider>
        </SessionProvider>
      </ReduxProvider>
    </StyledEngineProvider>
  );
}
