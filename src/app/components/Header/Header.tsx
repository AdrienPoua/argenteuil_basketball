import { useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";

import data from "../../utils/data/navbar";
import { NavFactory } from "../../utils/factories";
import { NavItem, NavItemMenu } from "../../utils/models";
import { MenuContext } from "../../utils/contexts";
import NavItemComponent from "./components/NavItem";
import NavItemMenuComponent from "./components/NavItemMenu";
import Contact from "./components/Contact";
import SubBar from "./components/SubBar";
import { useClickOutside } from "../../utils/hooks/useClickOutsideHeader";

export default function Header() {
  const navItems = data.map((item) => NavFactory.create(item));
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const headerRef = useRef(null);

  useClickOutside(isMenuOpen, setIsMenuOpen, headerRef);

  return (
    <header
      ref={headerRef}
      className={`flex flex-col w-full z-10 bg-transparent absolute top-0`}
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
              if (item instanceof NavItem) {
                return <NavItemComponent key={item.title} item={item} />;
              } else if (item instanceof NavItemMenu) {
                return <NavItemMenuComponent key={item.title} item={item} />;
              }
            })}
          </ul>
        </nav>
        <Contact />
      </div>
      <div className="bg-transparent blur-0 py-1 w-full"> </div>
      {isMenuOpen && <SubBar />}
    </header>
  );
}
