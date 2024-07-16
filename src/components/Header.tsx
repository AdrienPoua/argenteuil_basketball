"use client";
import React, { useRef, useEffect, useState } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import { NavItemType } from "@/utils/types";
import { usePathname } from "next/navigation";
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";

type HeaderProps = {
  data: NavItemType[];
};

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [activeNav, setActiveNav] = useState<NavItemType>({ title: "", subItems: [] });
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveNav({ title: "", subItems: [] });
  }, [pathname]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const clickedElement = e.target as Node;
      if (clickedElement.textContent === activeNav.title) {
        setActiveNav({ title: "", subItems: [] });
      }
    };

    document.addEventListener("mouseup", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseDown);
    };
  }, [activeNav]);


  return (
    <ClickAwayListener onClickAway={() => setActiveNav({ title: "", subItems: [] })}>
      <Box component="header" ref={headerRef} className="flex flex-col flex-wrap px-6 py-2 bg-white" id="back-to-top-anchor">
        <DesktopNav data={data} setActiveNav={setActiveNav} activeNav={activeNav} />
        <MobileNav data={data}  />
      </Box>
    </ClickAwayListener>
  );
};

export default Header;
