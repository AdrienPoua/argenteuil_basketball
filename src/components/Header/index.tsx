"use client";
import { useEffect, ReactElement } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import { usePathname } from "next/navigation";
import DesktopNav from "@/components/Header/DesktopNav";
import MobileNav from "@/components/Header/MobileNav";
import { useDispatch } from "react-redux";
import { hideSubBar, setCurrentNav } from "@/lib/redux/slices/navbar";


export default function Index(): ReactElement {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const handleClickAWay = () => {
    dispatch(hideSubBar());
  };
  
  useEffect(() => {
    dispatch(setCurrentNav(null));
  }, [pathname, dispatch]);

  return (
    <ClickAwayListener onClickAway={handleClickAWay}>
      <Box component="header" className="flex flex-col flex-wrap px-6 py-2 bg-white" id="back-to-top-anchor">
        <DesktopNav />
        <MobileNav />
      </Box>
    </ClickAwayListener>
  );
};

