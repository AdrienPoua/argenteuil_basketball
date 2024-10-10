"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import App from "./App";
import "./globals.css";
import store from "@/lib/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "@/components/ui/toaster"

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
            <Toaster />
            <ScrollToTopButton />
            {children}
          </App>
        </QueryClientProvider>
      </SessionProvider>
    </ReduxProvider >
  );
}
