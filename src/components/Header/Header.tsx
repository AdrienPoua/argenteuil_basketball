"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavItem } from "@/components/Header/NavItem";
import Modal from "@/components/modal";
import SubBar from "@/components/Header/SubBar";
import { v4 as uuiv4 } from "uuid";
import { NavItemType } from "@/types";
import { Box, ClickAwayListener, Typography, Button, Drawer, List, ListItem, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Arrow from "../Arrow";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import club from "@/data/club.json";
import { Utils } from "@/models";

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
      {data.subItems?.map((item) => (
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

type MobileNavProps = {
  data: NavItemType[];
  setOpen: (x: boolean) => void;
};
function MobileNav({ data, setOpen }: Readonly<MobileNavProps>) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleRouteChange = () => {
      setDrawerOpen(false);
    };
    handleRouteChange();
    return () => {};
  }, [pathname]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box className="flex grow lg:hidden justify-between">
      <Logo />
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        color="primary">
        <Typography
          variant="body1"
          className="tracking-widest font-thin">
          {" "}
          Contact{" "}
        </Typography>
      </Button>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}>
        <Box>
          <List className="flex flex-col justify-end pt-0">
            {data.map((item) =>
              !item.url ? (
                <Dropdown
                  key={uuiv4()}
                  data={item}
                />
              ) : (
                <ListItem
                  key={uuiv4()}
                  className="flex bg-primary me-9">
                  <Link
                    href={item.url}
                    className="grow flex justify-end me-5">
                    <Typography variant="body2">{item.title}</Typography>
                  </Link>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

const OpenContact = ({ icon, text, isMobile }: { icon: JSX.Element; text: string; isMobile: boolean }) => {
  const handleClick = () => {
    if (isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else if (isMobile) {
      window.location.href = `tel:${text}`;
    } else if (!isMobile && text.includes("@")) {
      window.location.href = `mailto:${text}`;
    } else {
      return;
    }
  };
  return (
    <Button
      className="bg-black py-4"
      sx={{
        "&:hover": {
          backgroundColor: "black", // Ou n'importe quelle couleur pour éviter le changement
        },
      }}
      endIcon={icon}
      onClick={handleClick}>
      <Typography className="leading-10 tracking-wider font-secondary text-xs md:text-base "> {text} </Typography>
    </Button>
  );
};

type HeaderProps = {
  data: NavItemType[];
  setActiveNav: (data: NavItemType) => void;
  activeNav: NavItemType;
  setOpen: (data: boolean) => void;
};

function DesktopNav({ data, setActiveNav, activeNav, setOpen }: Readonly<HeaderProps>) {
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
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary">
          <Typography
            variant="body1"
            className="tracking-widest font-thin">
            {" "}
            Contact{" "}
          </Typography>
        </Button>
      </Box>
      <SubBar data={activeNav} />
    </>
  );
}

export default function Header({ data }: Readonly<{ data: NavItemType[] }>) {
  const [activeNav, setActiveNav] = useState<NavItemType>({ title: "", subItems: [] });
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const handleRouteChange = () => {
      setActiveNav({ title: "", subItems: [] });
    };
    handleRouteChange();
    return () => {};
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
      <Box
        component={"header"}
        ref={headerRef}
        className="w-full flex flex-col flex-wrap px-6 py-2 bg-white"
        id="back-to-top-anchor">
        <DesktopNav
          data={data}
          setActiveNav={setActiveNav}
          activeNav={activeNav}
          setOpen={setOpen}
        />
        <MobileNav data={data} setOpen={setOpen} />
        <Modal
          open={open}
          setOpen={setOpen}>
          <>
            <OpenContact
              icon={<EmailIcon color="primary" />}
              text={club.email}
              isMobile={isMobile}
            />
            <OpenContact
              icon={<PhoneIphoneIcon color="primary" />}
              text={isMobile ? club.number : Utils.formatPhoneNumber(club.number)}
              isMobile={isMobile}
            />
          </>
        </Modal>
      </Box>
    </ClickAwayListener>
  );
}
