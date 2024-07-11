"use client";
import React, { useState } from "react";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <Box
      className="border-t-2 bg-black pt-4 pb-7 border-primary flex justify-center"
      component="footer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Box className="flex justify-center relative">
        <Box className="after:bg-gradient-to-r from-primary to-white after:p-1  after:shadow-xl after:w-full after:rounded-lg after:filter after:absolute after:-bottom-3 after:left-0 inline-block" />
        <Link
          href="https://www.linkedin.com/in/adrien-poua"
          target="_blank"
          className="text-gray-500 flex justify-center items-center no-underline">
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center" }}>
            Made with
            <Box
              component="span"
              className="text-primary mx-1">
              ❤
            </Box>
            by
            <Box
              component="span"
              className={isHover ? "ml-1 text-primary" : "ml-1"}>
              Adrien POUA
            </Box>
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
