import { useEffect, useState, ReactElement } from "react";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, openDrawer } from "@/lib/redux/slices/navbar";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import Dialog from "./Dialog";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { RootState } from "@/lib/redux/store";
import { open, setContent } from "@/lib/redux/slices/modal";
import MobileNavItem from "@/components/Header/MobileNavItem";

export default function Index(): ReactElement {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const isDrawerOpen = useSelector((state: RootState) => state.navbar.isDrawerOpen);
  const navItems = useSelector((state: RootState) => state.navbar.navItems);
  useEffect(() => {
    dispatch(closeDrawer());
  }, [pathname, dispatch]);


  return (
    <div className="flex items-center grow lg:hidden justify-between">
      <Logo />
      <Dialog />
      <Button onClick={() => dispatch(openDrawer())}>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Menu />
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex flex-col justify-end pt-0">
              {navItems.map((item) =>
                <MobileNavItem key={item.title} item={item} />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </Button>
    </div >
  );
};
