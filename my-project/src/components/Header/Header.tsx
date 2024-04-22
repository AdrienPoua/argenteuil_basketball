import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import data from "../../data/navbar";
import { NavFactory } from "../../utils/factories";
import { NavItem, NavItemMenu } from "../../utils/models";
import { ScrollingContext } from "../../App";
import NavItemComponent from "./NavItem";
import NavItemMenuComponent from "./NavItemMenu";
import Contact from "./Contact";
import SubBar from "./SubBar";

export default function Header() {
  const navItems = data.map((item) => NavFactory.create(item));
  const scrollingToTop: boolean = useContext(ScrollingContext);

  return (
    <div       className={`flex flex-col  ${
      scrollingToTop
        ? "sticky top-0 z-10 "
        : ""
    }`}>
    <div
      className={`flex w-full px-10 py-5 ${
        scrollingToTop
          ? "bg-primary  border-b-4 border-b-secondary"
          : ""
      }`}
    >
      <img src={logo} alt='logo' className='w-24' />
      <nav className='flex grow justify-center '>
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
    <SubBar />
    </div>
  );
}
