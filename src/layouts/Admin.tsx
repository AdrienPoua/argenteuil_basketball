import React from "react";
import { Box } from "@mui/material";

export default function Admin({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box className="bg-gray-500">
      <header>Admin Header</header>
      <main>{children}</main>
      <footer>Admin Footer</footer>
    </Box>
  );
}
