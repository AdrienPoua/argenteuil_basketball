import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import headerData from "@/data/header.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { usePathname } from 'next/navigation'


export default function App({ children} : Readonly<{ children: React.ReactNode}>) {
  const pathName = usePathname();

  const noLayout = ['/doc'].includes(pathName);

  
  return (
    <html lang='fr'>
      <body className='flex flex-col font-main min-h-svh '>
         {!noLayout && <Header data={headerData} /> }
        {children}
        {!noLayout && <Footer  /> }
        <ScrollToTopButton />
      </body>
    </html>
  );
}
