"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div className="bg-black py-16 grow">
        {children}
      </div>
      <Footer />
    </>
  );
}
