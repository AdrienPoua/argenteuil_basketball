import { useEffect, ReactElement } from "react";
import { SubItemType } from "@/utils/types";
import { Box, Button, Drawer, List, ListItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import Arrow from "@/components/Header/Arrow";
import HeaderModal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { closeDrawer, openDrawer } from "@/lib/redux/slices/navbar";
import { open, setContent } from "@/lib/redux/slices/modal";

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
              !item.href ? (
                <Dropdown
                  key={item.title}
                  header={
                    <Button className="grow w-full">
                      <Typography
                        variant="body2"
                        className="text-end grow">
                        {item.title}
                      </Typography>
                    </Button>
                  }
                  items={
                    <Box className="flex flex-col">
                      {item.subItems?.map((subItem: SubItemType) => (
                        <ListItem
                          key={subItem.href}
                          className="flex me-9">
                          <Link
                            href={subItem.href}
                            className="grow flex justify-end me-5">
                            <Typography variant="body2">{subItem.title}</Typography>
                          </Link>
                        </ListItem>
                      ))}
                    </Box>
                  }
                />
              ) : (
                <ListItem
                  key={item.href}
                  className="flex bg-primary">
                  <Link
                    href={item.href}
                    className="grow flex justify-end">
                    <Typography variant="body2">{item.title}</Typography>
                  </Link>
                  <Arrow hidden={true} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

