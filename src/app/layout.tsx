"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import App from "./App";
import "./globals.css";
import store from "@/lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { AlertProvider } from "@utils/contexts/Alerts";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <App>
            <AlertProvider >
              <ScrollToTopButton />
              {children}
            </AlertProvider>
          </App>
        </QueryClientProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}
