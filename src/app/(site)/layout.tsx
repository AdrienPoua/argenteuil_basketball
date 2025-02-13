import HeaderAndFooter from '@/components/layouts/HeaderAndFooter';

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeaderAndFooter>
      <div className='pt-24 md:pt-44'>{children}</div>
    </HeaderAndFooter>
  );
}
