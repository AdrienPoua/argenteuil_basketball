"use client";
import React, { useRef, useEffect, useState, ReactElement } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import { NavItemType } from "@/utils/types";
import { usePathname } from "next/navigation";
import DesktopNav from "@/components/Header/DesktopNav";
import MobileNav from "@/components/Header/MobileNav";
import headerData from "@/data/header.json";



export default function Index(): ReactElement {
  const [currentNav, setCurrentNav] = useState<NavItemType | null>(null);
  const [isHidden, setIsHidden] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentNav(null);
  }, [pathname]);

  return (
    <ClickAwayListener onClickAway={() => setIsHidden(true)}>
      <Box component="header" ref={headerRef} className="flex flex-col flex-wrap px-6 py-2 bg-white" id="back-to-top-anchor">
        <DesktopNav data={headerData} setCurrentNav={setCurrentNav} currentNav={currentNav} isHidden={isHidden} setIsHidden={setIsHidden} />
        <MobileNav data={headerData} />
      </Box>
    </ClickAwayListener>
  );
};

