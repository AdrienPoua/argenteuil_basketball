import React from 'react';
import { NavItemType } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import NavItem from "@/components/NavItem";
import SubBar from "@/components/SubBar";
import Logo from "@/components/Logo";

type DesktopNavProps = {
  data: NavItemType[];
  setActiveNav: (data: NavItemType) => void;
  activeNav: NavItemType;
  setOpen: (data: boolean) => void;
};

const DesktopNav: React.FC<DesktopNavProps> = ({ data, setActiveNav, activeNav, setOpen, }) => {
  return (
  <>
    <Box className="lg:flex hidden">
      <Logo />
      <Box component="nav" className="flex grow items-center">
        <Box component="ul" className="flex">
          {data.map((item) => (
            <NavItem key={item.title} data={item} activeNav={activeNav} setActiveNav={setActiveNav} />
          ))}
        </Box>
      </Box>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        <Typography variant="body1" className="tracking-widest font-thin">Contact</Typography>
      </Button>
    </Box>
    <SubBar data={activeNav} open={open} />
  </>
  )
}

export default DesktopNav;
