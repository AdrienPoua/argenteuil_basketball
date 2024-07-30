import React, { ReactElement } from "react";
import { NavItemType } from "@/utils/types";
import { Box, Button, Typography } from "@mui/material";
import Arrow from "./Arrow";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PropsType = {
  data: NavItemType;
  setCurrentNav: (data: NavItemType) => void;
  currentNav: NavItemType | null;
  setIsHidden: (b: boolean) => void;
};

export default function Index({ data, setCurrentNav, currentNav, setIsHidden }: Readonly<PropsType>) : ReactElement {
  const url = usePathname();
  const isCurrentlySelected = currentNav?.title === data.title;
  const isCurrentlyActive = data.url?.includes(url);

  const handleClick = () => {
    setCurrentNav(data)
    setIsHidden(false);
  };

  return (
    <Box component="li" className="grow flex justify-center items-center">
      {!data.url ? (
        <Button className="flex grow relative px-5 py-3 tracking-wider" onClick={handleClick}>
          <Box className="flex justify-center items-center">
            <Typography variant="body2" className={`flex text-lg ${isCurrentlySelected ? "text-primary" : ""}`}>
              {data.title}
            </Typography>
            <Arrow open={isCurrentlySelected} />
          </Box>
        </Button>
      ) : (
        <Link href={data.url} passHref>
          <Box className="grow flex justify-center items-center px-5 py-3">
            <Typography variant="body2" className={`flex text-lg ${isCurrentlyActive ? "text-primary" : ""}`}>
              {data.title}
            </Typography>
          </Box>
        </Link>
      )}
    </Box>
  );
};

