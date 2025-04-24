import HeaderAndFooter from '@/components/layouts/HeaderAndFooter';

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeaderAndFooter>
      <div className='lg:pt-44'>{children}</div>
    </HeaderAndFooter>
  );
}
