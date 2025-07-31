import Header from '@/components/parts/header';
import Footer from '@/components/parts/footer';

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='min-h-screen bg-black lg:pt-44'>{children}</div>
      <Footer />
    </div>
  );
}
