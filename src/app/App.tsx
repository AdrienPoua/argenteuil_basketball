import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import headerData from "@/data/header.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { usePathname } from 'next/navigation';

const shouldUseLayout = (pathname: string): boolean => {
  const noLayoutPaths = ['/doc'];
  return !noLayoutPaths.includes(pathname);
};

export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const useLayout = shouldUseLayout(pathname);

  return (
    <html lang='fr'>
      <body className='flex flex-col font-main min-h-svh'>
        {useLayout && <Header data={headerData} />}
        {children}
        {useLayout && <Footer />}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
