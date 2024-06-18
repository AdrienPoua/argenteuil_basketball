import React from "react";
import { NavItemType } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import NavItem from "@/components/NavItem";
import SubBar from "@/components/SubBar";
import Logo from "@/components/Logo";
import { ContactContent } from "@/components/Overlay";
import { useOverlay } from "@/contexts/Overlay";

type DesktopNavProps = {
  data: NavItemType[];
  setActiveNav: (data: NavItemType) => void;
  activeNav: NavItemType;
};

const DesktopNav: React.FC<DesktopNavProps> = ({ data, setActiveNav, activeNav }) => {
  const { setOpen, setContent } = useOverlay();
  const handleClick = () => {
    setOpen(true);
    setContent(<ContactContent isMobile={false} />);
  };
  return (
    <>
      <Box className="lg:flex hidden">
        <Logo />
        <Box
          component="nav"
          className="flex grow items-center justify-center">
          <Box
            component="ul"
            className="flex">
            {data.map((item) => (
              <NavItem
                key={item.title}
                data={item}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
              />
            ))}
          </Box>
        </Box>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          className="h-fit self-center">
          <Typography
            variant="body1"
            className="tracking-widest font-thin">
            Contact
          </Typography>
        </Button>
      </Box>
      <SubBar data={activeNav} />
    </>
  );
};

export default DesktopNav;
