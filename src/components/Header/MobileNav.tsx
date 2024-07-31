import React, { useState, useEffect, ReactElement } from "react";
import { NavItemType, SubItemType } from "@/utils/types";
import { Box, Button, Drawer, List, ListItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useModal } from "@/utils/contexts/Modal";
import Arrow from "@/components/Header/Arrow";
import HeaderModal from "./Modal";

type PropsType = {
  data: NavItemType[];
};

export default function Index({ data }: Readonly<PropsType>): ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { setOpen, setContent } = useModal();
  const handleClick = () => {
    setOpen(true);
    setContent(<HeaderModal isMobile={true} />);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

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
                          key={subItem.url}
                          className="flex me-9">
                          <Link
                            href={subItem.url}
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
                  key={item.url}
                  className="flex bg-primary">
                  <Link
                    href={item.url}
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

