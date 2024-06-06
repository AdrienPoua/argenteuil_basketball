import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { NavItem } from "@/components/Header/NavItem";
import Contact from "@/components/Header/modal";
import SubBar from "@/components/Header/SubBar";
import { v4 as uuiv4 } from "uuid";
import { NavItemType } from "@/types";
import { Box, ClickAwayListener } from "@mui/material";

export default function Header({ data }: Readonly<{ data: NavItemType[] }>) {
  const [activeNav, setActiveNav] = useState<NavItemType>({
    title: "",
    subItems: [],
  });
  const headerRef = useRef<HTMLDivElement>(null);

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
    <Box component={"header"} ref={headerRef} className="w-full flex flex-wrap px-6 py-2 bg-white" id='back-to-top-anchor'>
        <Link href='/' className='shrink-0'>
          <Image src={logo} alt='logo' className='me-5' width='80' height='80' />
        </Link>
        <Box component={"nav"} className='flex grow items-center'>
          <Box component={"ul"} className='flex'>
            {data.map((item) => (
              <NavItem key={uuiv4()} data={item} setActiveNav={setActiveNav} />
            ))}
          </Box>
        </Box>
        <Contact />
      <SubBar data={activeNav} />
    </Box>
    </ClickAwayListener>
  );
}
