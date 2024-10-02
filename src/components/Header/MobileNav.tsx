import { useEffect, ReactElement } from "react";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import HeaderModal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { closeDrawer, openDrawer } from "@/lib/redux/slices/navbar";
import { open, setContent } from "@/lib/redux/slices/modal";
import MobileNavItem from "@/components/Header/MobileNavItem";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

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
    <div className="flex items-center grow lg:hidden justify-between">
      <Logo />
      <Button
        onClick={handleClick}
        className="h-fit"
        color="primary">
        <p
          className="">
          Contact
        </p>
      </Button>
      <Button onClick={() => dispatch(openDrawer())}>
        <Menu />
      </Button>
    </div >
  );
};
