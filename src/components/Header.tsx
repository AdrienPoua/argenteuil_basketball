"use client";
import React, { useRef, useEffect, useState } from "react";
import { Box, ClickAwayListener, useTheme, useMediaQuery } from "@mui/material";
import { NavItemType } from "@/types";
import { usePathname } from "next/navigation";
import { useModal } from "@/contexts/modalContext";
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import { ContactContent } from "@/components/Modal";

type HeaderProps = {
  data: NavItemType[];
};

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [activeNav, setActiveNav] = useState<NavItemType>({ title: "", subItems: [] });
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { setOpen, setContent } = useModal();

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

  useEffect(() => {
    setContent(<ContactContent isMobile={isMobile} />);
  }, [isMobile, setContent]);

  return (
    <ClickAwayListener onClickAway={() => setActiveNav({ title: "", subItems: [] })}>
      <Box component="header" ref={headerRef} className="w-full flex flex-col flex-wrap px-6 py-2 bg-white" id="back-to-top-anchor">
        <DesktopNav data={data} setActiveNav={setActiveNav} activeNav={activeNav} setOpen={setOpen} />
        <MobileNav data={data} setOpen={setOpen} />
      </Box>
    </ClickAwayListener>
  );
};

export default Header;
