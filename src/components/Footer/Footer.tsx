import Image from "next/image";
import React, { useRef, useEffect } from "react";
import logo from "@/public/images/logo.jpg";
import { Box, Link, Typography } from "@mui/material";
import club from "@/data/club.json";

export default function Footer() {
  const signatureRef = useRef(null);
  const [isHover, setIsHover] = React.useState(false);

  useEffect(() => {
    const ref = signatureRef.current as HTMLElement | null;
    const handleMouseEnter = () => {
      setIsHover(true);
    };
    const handleMouseLeave = () => {
      setIsHover(false);
    };

    if (ref) {
      ref?.addEventListener("mouseenter", handleMouseEnter);
      ref?.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("mouseenter", handleMouseEnter);
        ref.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <Box ref={signatureRef} className='border-t-2 bg-black border-indigo-500 flex flex-col px-12 ' component='footer'>
      <Box className='flex justify-between'>
        <Link href='/' className='shrink-0'>
          <Image src={logo} alt='logo' className='me-5' width={80} height={80} />
        </Link>
        <Link href='https://www.linkedin.com/in/adrien-poua' target="blank" className='text-gray-500 flex justify-center items-center no-underline	'>
          <Typography variant="body1">
            Made with ❤ by&nbsp;
            <span className={isHover ? "text-indigo-500" : ""}>Adrien POUA</span>
          </Typography>
        </Link>
        <Box className='flex flex-col justify-center items-center text-white'>
          <Typography> {club.adresse}  </Typography>
          <Typography> {club.code_postal} {club.ville}  </Typography>
        </Box>
      </Box>
    </Box>
  );
}
