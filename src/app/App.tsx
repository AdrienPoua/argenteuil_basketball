import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import headerData from "@/data/header.json";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function App({ children} : Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang='fr'>
      <body className='flex flex-col'>
        <Header data={headerData} />
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
