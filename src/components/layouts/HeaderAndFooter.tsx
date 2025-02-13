'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='grow bg-black'>{children}</div>
      <Footer />
    </div>
  );
}
