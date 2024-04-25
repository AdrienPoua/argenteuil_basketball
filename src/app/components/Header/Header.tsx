import React, { useContext, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image"
import logo from "/public/logo.png";


import data from "../../utils/data/navbar";
import { NavFactory } from "../../Utils/factory"
import { NavItem, NavItemMenu } from "../../Utils/models";
import { MenuContext, ScrollingContext } from "../../utils/contexts";
import NavItemComponent from "./components/NavItem";
import NavItemMenuComponent from "./components/NavItemMenu"
import Contact from "./components/Contact";
import SubBar from "./components/SubBar";
import useTopPage from "../../utils/hooks/useTopPage";
import { useClickOutside } from "../../utils/hooks/useClickOutsideHeader";



export default function Header() {
  const navItems = data.map((item) => NavFactory.create(item));
  const scrollingToTop: boolean = useContext(ScrollingContext);
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const [isTopPage, setIsTopPage] = useState(true);
  const headerRef = useRef(null)

  useTopPage(setIsTopPage);
  useClickOutside(isMenuOpen, setIsMenuOpen, headerRef);

  return (
    <div
      ref={headerRef}
      className={`flex flex-col shadow-xl w-full z-10 bg-white sticky top-0`}
    >
      <div className='flex w-full px-10 py-5'>
        <Link href='/' className='shrink-0'>
          <Image src={logo} alt='logo' className='me-5' width="80" height="80"/>{" "}
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
      {isMenuOpen && <SubBar />}
    </div>
  );
}