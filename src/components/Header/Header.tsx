import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavItem } from "@/components/Header/NavItem";
import Contact from "@/components/Header/modal";
import SubBar from "@/components/Header/SubBar";
import { v4 as uuiv4 } from "uuid";
import { NavItemType } from "@/types";
import { Box, ClickAwayListener, Typography, Button, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Arrow from "../Arrow";
import Logo from "@/components/Logo";

const Title = ({ title }: { title: string }) => {
  return (
    <ListItem className="flex bg-primary ">
      <Button className=" grow flex justify-end">
        <Typography variant="body2">{title}</Typography>
        <Arrow />
      </Button>
    </ListItem>
  );
};

const Dropdown = ({ data }: { data: NavItemType }) => {
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("max-h-12");
  useEffect(() => {
    if (open) {
      setMaxHeight("max-h-96");
    } else {
      setMaxHeight("max-h-12");
    }
  }, [open]);

  return (
    <Box
      className={` overflow-hidden ${maxHeight} transition-all duration-300  cursor-pointer`}
      onClick={() => setOpen((toggle) => !toggle)}>
      <Title title={data.title} />
      {data.subItems.map((item) => (
        <ListItem
          key={uuiv4()}
          className="flex justify-end h-12 ">
          <Link href={item.url}>
            <Typography variant="body2">{item.title}</Typography>
          </Link>
        </ListItem>
      ))}
    </Box>
  );
};

function MobileNav({ data }: Readonly<{ data: NavItemType[] }>) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event) => {
    setDrawerOpen(open);
  };

  return (
    <Box className="flex grow lg:hidden justify-between">
      <Logo />
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}>
        <Box>
          <List className="flex flex-col justify-end pt-0">
            {data.map((item) => (
              <Dropdown
                key={uuiv4()}
                data={item}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}


function DesktopNav({ data, setActiveNav, activeNav }: Readonly<HeaderProps>) {
  return (
    <>
      <Box className="lg:flex hidden">
        <Logo />

        <Box
          component={"nav"}
          className="flex grow items-center">
          <Box
            component={"ul"}
            className="flex">
            {data.map((item) => (
              <NavItem
                key={uuiv4()}
                data={item}
                setActiveNav={setActiveNav}
              />
            ))}
          </Box>
        </Box>
        <Contact />
      </Box>
      <SubBar data={activeNav} />
    </>
  );
}

export default function Header({ data }: Readonly<{ data: NavItemType[] }>) {
  const [activeNav, setActiveNav] = useState<NavItemType>({ title: "", subItems: [] });
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
      <Box
        component={"header"}
        ref={headerRef}
        className="w-full flex flex-col flex-wrap px-6 py-2 bg-white"
        id="back-to-top-anchor">
        <DesktopNav
          data={data}
          setActiveNav={setActiveNav}
          activeNav={activeNav}
        />
        <MobileNav
          data={data}
          setActiveNav={setActiveNav}
          activeNav={activeNav}
        />
      </Box>
    </ClickAwayListener>
  );
}
