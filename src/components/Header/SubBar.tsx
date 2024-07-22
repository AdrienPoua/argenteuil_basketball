import React from "react";
import { NavItemType, SubItemType } from "@/utils/types";
import { Box } from "@mui/material";
import Item from "@/components/Header/SubBarItem";

export default function SubBar({ data }: Readonly<{ data: NavItemType }>) {
  
  return (
    <Box className="flex gap-24 bg-white Readonly<SubBarProps> py-1 justify-center items-center transition-all duration-300">
      {data.subItems?.map((item: SubItemType) => (
        <Item
          data={item}
          key={item.url}
        />
      ))}
    </Box>
  );
}
