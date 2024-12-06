import { ReactElement } from "react";
import Arrow from "./Arrow";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { TNavbar } from "@/types";
import Link from "next/link";
import { setCurrentNav, showSubBar } from "@/utils/redux/slices/navbar";
import { Button } from "@/components/ui/button";


const DirectNavItem = ({ item }: { item: TNavbar.DirectNavItem }): ReactElement => {
  const url = usePathname();
  const isActive = url === item.href;
  return (
    <li className="grow flex justify-center items-center text-background">
      <Link href={item.href} passHref >
        <div className="grow flex justify-center items-center px-5 py-3">
          <p className={`flex text-lg ${isActive ? "text-primary" : ""}`}>
            {item.title}
          </p>
        </div>
      </Link>
    </li>
  );
};

const ExpendableNavItem = ({ item }: { item: TNavbar.ExpendableNavItem }): ReactElement => {
  const dispatch = useDispatch();
  const currentNav = useSelector((state: RootState) => state.navbar.currentNav);
  const isHidden = useSelector((state: RootState) => state.navbar.isHidden);
  const isSelected = isHidden === false && currentNav?.title === item.title;
  const handleClick = () => {
    dispatch(setCurrentNav(item))
    dispatch(showSubBar())
  }
  return (
    <li className="grow flex justify-center items-center">
      <Button onClick={handleClick} variant="ghostSecondary">
        <p className={`flex text-lg me-2 ${isSelected ? "text-primary" : ""}`}>
          {item.title}
        </p>
        <Arrow open={isSelected} />
      </Button>
    </li>
  );
};

export default function Factory({ item }: Readonly<{ item: TNavbar.DirectNavItem | TNavbar.ExpendableNavItem }>): ReactElement {
  if ('href' in item) {
    return <DirectNavItem item={item} />;
  } else {
    return <ExpendableNavItem item={item} />;
  }
};

