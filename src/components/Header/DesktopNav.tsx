import { ReactElement } from "react";
import NavItem from "@/components/Header/DesktopNavItem";
import SubBar from "@/components/Header/SubBar";
import Logo from "@/components/Logo";
import HeaderModal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { open, setContent } from "@/lib/redux/slices/modal";
import { Button } from "@/components/ui/button";

export default function Index(): ReactElement {
  const navItems = useSelector((state: RootState) => state.navbar.navItems);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(open());
    dispatch(setContent(<HeaderModal isMobile={false} />));
  };
  return (
    <>
      <div className="lg:flex hidden relative">
        <Logo />
        <nav
          className="flex grow items-center justify-center">
          <ul
            className="flex">
            {navItems.map((item) => (
              <NavItem
                key={item.title}
                item={item}
              />
            ))}
          </ul>
        </nav>
        <Button
          onClick={handleClick}
          color="primary"
          className="h-fit self-center">
          <p
            className="tracking-widest font-thin">
            Contact
          </p>
        </Button>
      </div>
      <SubBar />
    </>
  );
};
