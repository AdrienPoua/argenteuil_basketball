import React, { useContext, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import data from "../../data/navbar";
import { NavFactory } from "../../utils/factories";
import { NavItem, NavItemMenu } from "../../utils/models";
import { MenuContext, ScrollingContext } from "../../App";
import NavItemComponent from "./NavItem";
import NavItemMenuComponent from "./NavItemMenu";
import Contact from "./Contact";
import SubBar from "./SubBar";


export default function Header() {
  const navItems = data.map((item) => NavFactory.create(item));
  const scrollingToTop: boolean = useContext(ScrollingContext);
  const { isMenuOpen } = useContext(MenuContext);
  const [isTopPage, setIsTopPage] = useState(true);

  
  useEffect(() => {
    const handleScroll = () => {
        setIsTopPage(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    console.log(isTopPage)

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, [window.scrollY]);
  


  return (
    <div
      className={`flex flex-col shadow-xl w-full z-10 bg-white ${
        scrollingToTop && !isTopPage && "sticky top-0 z-10 "}
      `}
    >
      <div className='flex w-full px-10 py-5'>
        <a href='/' className='shrink-0'>
          {" "}
          <img src={logo} alt='logo' className='w-20 me-5 ' />{" "}
        </a>
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
      {isMenuOpen && <SubBar />}{" "}
    </div>
  );
}
