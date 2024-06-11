import React from "react";
import { NavItemType } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import Arrow from "../Arrow";
import Link from "next/link";

type NavItemProps = {
  data: NavItemType;
  setActiveNav: (data: NavItemType) => void;
};

export const NavItem: React.FC<NavItemProps> = ({ data, setActiveNav }) => {
  return !data.url ? (
    <Box
      component="li"
      key={data.title}
      className="grow flex justify-center items-center">
      <Button
        className="flex grow relative px-5 py-3 tracking-wider	"
        onClick={() => setActiveNav(data)}>
        <Box className="flex justify-center items-center">
          <Typography
            variant="body2"
            className="flex text-lg">
            {data.title}
          </Typography>
          <Arrow />
        </Box>
      </Button>
    </Box>
  ) : (
    <Link
      href={data.url}
      key={data.title}
      className="grow flex justify-center items-center px-5 py-3 ">
      <Typography
        variant="body2"
        className="flex text-lg">
        {data.title}
      </Typography>
    </Link>
  );
};
