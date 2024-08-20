import { useEffect, ReactElement } from "react";
import { Box, Button, Drawer, List, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import HeaderModal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { closeDrawer, openDrawer } from "@/lib/redux/slices/navbar";
import { open, setContent } from "@/lib/redux/slices/modal";
import MobileNavItem from "@/components/Header/MobileNavItem";

export default function Index(): ReactElement {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state: RootState) => state.navbar.isDrawerOpen);
  const navItems = useSelector((state: RootState) => state.navbar.navItems);
  const handleClick = () => {
    dispatch(open());
    dispatch(setContent(<HeaderModal isMobile={true} />));
  };

  useEffect(() => {
    dispatch(closeDrawer());
  }, [pathname, dispatch]);


  return (
    <Box className="flex items-center grow lg:hidden justify-between">
      <Logo />
      <Button
        variant="contained"
        onClick={handleClick}
        className="h-fit"
        color="primary">
        <Typography
          variant="body1"
          className="">
          Contact
        </Typography>
      </Button>
      <Button onClick={() => dispatch(openDrawer())}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => dispatch(closeDrawer())}>
        <Box>
          <List className="flex flex-col justify-end pt-0">
            {navItems.map((item) =>
              <MobileNavItem key={item.title} item={item} />
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
