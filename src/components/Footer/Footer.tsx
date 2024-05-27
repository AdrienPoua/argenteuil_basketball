import Image from "next/image";
import React, { useRef, useEffect } from "react";
import logo from "@/public/logo.png";
import { Box, Link, Typography } from "@mui/material";

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
        <Link href='https://www.linkedin.com/in/adrien-poua' target="blank" className='text-gray-500 flex justify-center items-center'>
          <Typography variant='body1'>
            Made with ❤ by&nbsp;
            <span className={isHover ? "text-indigo-500" : ""}>Adrien POUA</span>
          </Typography>
        </Link>
        <Typography className='flex justify-center items-center text-white'>
          82 boulevard du général leclerc <br />
          95100 Argenteuil
        </Typography>
      </Box>
    </Box>
  );
}
