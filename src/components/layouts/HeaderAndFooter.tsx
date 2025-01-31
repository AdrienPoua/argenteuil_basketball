'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='grow bg-black grow py-16'>{children}</div>
      <Footer />
    </div>
  );
}
