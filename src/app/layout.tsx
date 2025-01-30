'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import App from './App';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <App>
          <Toaster />
          {children}
        </App>
      </QueryClientProvider>
    </SessionProvider>
  );
}
