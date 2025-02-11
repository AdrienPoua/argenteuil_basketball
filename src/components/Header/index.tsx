'use client';
import DesktopNav from '@/components/Header/DesktopNav';
import MobileNav from '@/components/Header/MobileNav';

export default function Header() {
  return (
    <header className=''>
      <DesktopNav />
      <MobileNav />
    </header>
  );
}
