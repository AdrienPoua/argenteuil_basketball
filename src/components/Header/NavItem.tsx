import { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import Arrow from "./Arrow";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { NavItemType } from "@/utils/types";
import Link from "next/link";
import { setCurrentNav, showSubBar } from "@/lib/redux/slices/navbar";
type PropsType = {
  navItem: NavItemType
};

export default function Index({ navItem }: Readonly<PropsType>): ReactElement {
  const { title, href } = navItem;
  const dispatch = useDispatch();
  const currentNav = useSelector((state: RootState) => state.navbar.currentNav);
  const url = usePathname();
  const isActive = url === href
  const isSelected = currentNav?.title === title;

  const handleClick = () => {
    dispatch(setCurrentNav(navItem))
    dispatch(showSubBar())
  }

  return (
    <Box component="li" className="grow flex justify-center items-center">
      {!href ? (
        <Button className="flex grow relative px-5 py-3 tracking-wider" onClick={handleClick}>
          <Box className="flex justify-center items-center">
            <Typography variant="body2" className={`flex text-lg ${isSelected ? "text-primary" : ""}`}>
              {title}
            </Typography>
            <Arrow open={isSelected} />
          </Box>
        </Button>
      ) : (
        <Link href={href} passHref >
          <Box className="grow flex justify-center items-center px-5 py-3">
            <Typography variant="body2" className={`flex text-lg ${isActive ? "text-primary" : ""}`}>
              {title}
            </Typography>
          </Box>
        </Link>
      )}
    </Box>
  );
};

