import React, { useState, useEffect } from 'react';
import { NavItemType } from "@/types";
import { Box, Button, Drawer, List, ListItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";

type MobileNavProps = {
  data: NavItemType[];
  setOpen: (x: boolean) => void;
};

const MobileNav: React.FC<MobileNavProps> = ({ data, setOpen }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box className="flex grow lg:hidden justify-between">
      <Logo />
      <Button variant="contained" onClick={() => setOpen(true)} color="primary">
        <Typography variant="body1" className="tracking-widest font-thin">Contact</Typography>
      </Button>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box>
          <List className="flex flex-col justify-end pt-0">
            {data.map((item) =>
              !item.url ? (
                <Dropdown key={item.title} 
                  header={
                      <Button className="grow w-full">
                        <Typography variant="body2" className="text-end grow" >{item.title}</Typography>
                      </Button>
                  }
                  items={
                    <Box className="flex flex-col">
                      {item.subItems?.map((subItem) => (
                        <ListItem key={subItem.url} className="flex me-9">
                          <Link href={subItem.url} className="grow flex justify-end me-5">
                            <Typography variant="body2">{subItem.title}</Typography>
                          </Link>
                        </ListItem>
                      ))}
                    </Box>
                  }
                />
              ) : (
                <ListItem key={item.url} className="flex bg-primary me-9">
                  <Link href={item.url} className="grow flex justify-end me-5">
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
};

export default MobileNav;
