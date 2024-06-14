import React, { useState } from "react";
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <Box
      className="border-t-2 bg-black py-8 border-primary flex justify-center"
      component="footer"
    >
      <Box className="flex justify-center">
        <Link
          href="https://www.linkedin.com/in/adrien-poua"
          target="_blank"
          className="text-gray-500 flex justify-center items-center no-underline"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Typography variant="body1" className="flex items-center">
            Made with <span className="mx-1">❤</span> by
            <span className={`ml-1 ${isHover ? "text-indigo-500" : ""}`}>Adrien POUA</span>
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
