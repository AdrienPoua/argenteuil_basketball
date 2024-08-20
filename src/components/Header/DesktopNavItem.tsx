import { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import Arrow from "./Arrow";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { TNavbar } from "@/utils/types";
import Link from "next/link";
import { setCurrentNav, showSubBar } from "@/lib/redux/slices/navbar";


const DirectNavItem = ({ item }: { item: TNavbar.DirectNavItem }): ReactElement => {
  const url = usePathname();
  const isActive = url === item.href;
  return (
    <Box component="li" className="grow flex justify-center items-center">
      <Link href={item.href} passHref >
        <Box className="grow flex justify-center items-center px-5 py-3">
          <Typography variant="body2" className={`flex text-lg ${isActive ? "text-primary" : ""}`}>
            {item.title}
          </Typography>
        </Box>
      </Link>
    </Box>
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
    <Box component="li" className="grow flex justify-center items-center">
      <Button className="flex grow relative px-5 py-3 tracking-wider" onClick={handleClick}>
        <Box className="flex justify-center items-center">
          <Typography variant="body2" className={`flex text-lg ${isSelected ? "text-primary" : ""}`}>
            {item.title}
          </Typography>
          <Arrow open={isSelected} />
        </Box>
      </Button>
    </Box>
  );
};

export default function Factory({ item }: Readonly<{ item: TNavbar.DirectNavItem | TNavbar.ExpendableNavItem }>): ReactElement {
  if ('href' in item) {
    return <DirectNavItem item={item} />;
  } else {
    return <ExpendableNavItem item={item} />;
  }
};