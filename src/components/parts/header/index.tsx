'use client'
import NavbarDesktop from '@/components/parts/header/navbar.desktop'
import NavbarMobile from '@/components/parts/header/navbar.mobile'

export default function Header() {
  return (
    <header className="">
      <NavbarDesktop />
      <NavbarMobile />
    </header>
  )
}
