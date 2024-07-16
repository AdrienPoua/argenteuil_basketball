import React, { useEffect, useState } from "react";
import { NavItemType } from "@/utils/types";
import { Box, Button, Typography } from "@mui/material";
import Arrow from "./Arrow";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  data: NavItemType;
  setActiveNav: (data: NavItemType) => void;
  activeNav: NavItemType;
};

const NavItem: React.FC<NavItemProps> = ({ data, setActiveNav, activeNav }) => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const url = usePathname();

  const handleClick = () => {
    setActiveNav(data);
  };

  useEffect(() => {
    setOpen(activeNav.title === data.title);
  }, [activeNav, data.title]);

  useEffect(() => {
    setIsActive(data.url === url);
  }, [data.url, url]);


  return (
    <Box component="li" className="grow flex justify-center items-center">
      {!data.url ? (
        <Button className="flex grow relative px-5 py-3 tracking-wider" onClick={handleClick}>
          <Box className="flex justify-center items-center">
            <Typography variant="body2" className={`flex text-lg ${open ? "text-primary" : ""}`}>
              {data.title}
            </Typography>
            <Arrow open={open} />
          </Box>
        </Button>
      ) : (
        <Link href={data.url} passHref>
          <Box className="grow flex justify-center items-center px-5 py-3">
            <Typography variant="body2" className={`flex text-lg ${isActive ? "text-primary" : ""}`}>
              {data.title}
            </Typography>
          </Box>
        </Link>
      )}
    </Box>
  );
};

export default NavItem;
