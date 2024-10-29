import { ReactElement } from "react";
import NavItem from "@/components/Header/DesktopNavItem";
import SubBar from "@/components/Header/SubBar";
import Logo from "@/components/Logo";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Dialog from "./Dialog";

export default function Index(): ReactElement {
  const navItems = useSelector((state: RootState) => state.navbar.navItems);
  return (
    <>
      <div className="lg:flex hidden relative items-center">
        <Logo />
        <nav
          className="flex grow items-center justify-center">
          <ul
            className="flex">
            {navItems.map((item) => (
              <NavItem 
              key={item.title}
                item={item}
              />
            ))}
          </ul>
        </nav>
        <Dialog />
      </div>
      <SubBar />
    </>
  );
};
