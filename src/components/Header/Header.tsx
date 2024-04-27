import { useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/logo.png";

import  data  from "@/data/navbar";
import { NavFactory } from "@/factories";
import { NavLinkModel, NavDropdownModel } from "@/models";
import { MenuContext } from "@/hooks/useContext";
import { NavLink, NavDropdown } from "@/components/Header/NavItem"
import Contact from "@/components/Header/Contact";
import SubBar from "@/components/Header/SubBar";
import  useClickOutside from "@/hooks/useClickOutsideHeader"

export default function Header() {
  const navItems = data.map((item) => NavFactory.create(item));
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const headerRef = useRef(null);

  useClickOutside(isMenuOpen, setIsMenuOpen, headerRef);

  return (
    <header
      ref={headerRef}
      className={`flex flex-col w-full z-10 bg-transparent`}
    >
      <div className='flex w-full px-6 py-2 bg-white '>
        <Link href='/' className='shrink-0'>
          <Image
            src={logo}
            alt='logo'
            className='me-5'
            width='50'
            height='50'
          />{" "}
        </Link>
        <nav className='flex grow '>
          <ul className='flex'>
            {navItems.map((item) => {
              if (item instanceof NavLinkModel) {
                return <NavLink key={item.title} item={item} />;
              } else if (item instanceof NavDropdownModel) {
                return <NavDropdown key={item.title} item={item} />;
              }
            })}
          </ul>
        </nav>
        <Contact />
      </div>
      {isMenuOpen && <SubBar />}
    </header>
  );
}
