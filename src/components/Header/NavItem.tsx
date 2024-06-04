import React from "react";
import { NavItemType } from "@/types";
import { Box, Button, Typography } from "@mui/material";

type NavItemProps = {
  data: NavItemType;
  setActiveNav: (data: NavItemType) => void;
}

export const NavItem: React.FC<NavItemProps> = ({ data, setActiveNav }) => {
  return (
    <Box
      component="li"
      key={data.title}
      className="grow flex justify-center items-center"
    >
      <Button
        className="flex grow relative px-5 py-3 tracking-wider	"
        onClick={() => setActiveNav(data)}
      >
        <Box className="flex justify-center items-center">
          <Typography variant="body2" className="flex text-lg">{data.title}</Typography>
          {/* Élément simulant un pseudo-élément ::after */}
          <Box
            component="span"
            sx={{
              display: "inline-block",
              verticalAlign: "middle",
              marginLeft: "6px",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "5px 5px 0",
              borderColor: "#000 transparent transparent transparent",
            }}
          />
        </Box>
      </Button>
    </Box>
  );
};
